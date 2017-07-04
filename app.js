// Simple event bus to broadcast events
var bus = new Vue();

Vue.filter('formatBalance', function(value) {
    value = Nimiq.Policy.satoshisToCoins(value);

    // If the value has no decimal places below 0.01, display 0 decimals
    if(parseFloat(value.toFixed(2)) === value) {
        return value.toFixed(2);
    }
    // Otherwise, all required decimals will be displayed automatically
    else return value;
});

var About    = { template: '#template-about' },
    Charts   = { template: '#template-charts' },
    Block    = { template: '#template-block-info', props: ['block'] },
    Account  = { template: '#template-account-info', props: ['account'] },
    HashInfo = {
        // template: '#template-hashinfo',
        template: '<block-info v-if="type === \'Block Hash\' || type === \'Block Number\'" :block="obj"></block-info>'
                + '<account-info v-else-if="type === \'Account Address\'" :account="obj"></account-info>'
                + '<h2 v-else>Not Found</h2>',
        props: ['hash'],
        data: function() {
            return {
                obj: {}
            };
        },
        beforeRouteEnter: function(to, from, next) {
            if(router.app.status === 'connected') next();
            else bus.$once('connected', next);
        },
        components: {
            'block-info': Block,
            'account-info': Account
        },
        computed: {
            type: function() {
                var value = this.hash;

                if(vue.status !== 'connected') return null;

                if(value.match(/^[A-Fa-f0-9]{40}$/)) {
                    $.accounts.getBalance(Nimiq.Address.fromHex(value)).then(function(balance) {
                        var accountInfo = {
                            hash: value,
                            balance: balance.value,
                            nonce: balance.nonce,
                            transactions: []
                        };

                        this.obj = accountInfo;

                        window.scrollTo(0, this.$el.offsetTop - 100);
                    }.bind(this));

                    return 'Account Address';
                }
                else if(value.match(/^[A-Fa-f0-9]{64}$/) && value.substr(0, 2) === "00") {
                    getBlockInfo(value, function(blockInfo) {
                        if(!blockInfo) {
                            alert("That block cannot be found. It my be out of reach due to the temporary checkpoint solution. Lowest possible block: " + $.blockchain.path[0].toHex());
                            return null;
                        }

                        this.obj = blockInfo;

                        window.scrollTo(0, this.$el.offsetTop - 100);
                    }.bind(this));

                    return 'Block Hash';
                }
                else if(value.match(/^[0-9]*$/) && parseInt(value)) {
                    var currentHeight = $.blockchain.head.height;
                    var pathIndex     = value - currentHeight - 1; // Should be a negative number

                    if(pathIndex < -$.blockchain.path.length) {
                        alert("That block is out of reach due to the temporary checkpoint solution. Lowest possible block: " + $.blockchain.path[0].toHex());
                        return null;
                    }
                    if(pathIndex > -1) {
                        alert("That block has not been mined yet.");
                        return null;
                    }

                    var blockHash = $.blockchain.path.slice(pathIndex)[0];

                    getBlockInfo(blockHash, function(blockInfo) {
                        if(!blockInfo) {
                            alert("Cannot find block.");
                            return null;
                        }
                        // console.log(blockInfo);

                        this.obj = blockInfo;

                        window.scrollTo(0, this.$el.offsetTop - 100);
                    }.bind(this));

                    return 'Block Number';
                }
                else {
                    this.obj = {};
                    return null;
                }
            }
        }
    };

var router = new VueRouter({
    routes: [
        { path: '/about', component: About   },
        { path: '/charts', component: Charts   },
        { path: '/:hash', component: HashInfo, props: true }
    ],
    // Can only be used with HTML5 history mode (requires server config)
    // scrollBehavior: function(to, from, savedPosition) {
    //     console.log(to);
    //     if(savedPosition) return savedPosition;
    //     else if(to === '/') return {x: 0, y: 0};
    //     else return { selector: '#infobox', offset: {y: -100} };
    // }
});

var vue = new Vue({
    router: router,
    el: '#main',
    data: {
        status: 'initializing',
        height: 'loading',
        targetHeight: false,
        peerCount: 0,
        searchTerm: '',
        searchTermFormat: 'none',
        blocks: []
    },
    methods: {
        search: function() {
            router.push(this.searchTerm);
        }
    }
});

function _onConsensusEstablished() {
    vue.status = 'connected';
    vue.targetHeight = false;

    bus.$emit('connected');

    getLatestBlocks();
}

function _onConsensusLost() {
    console.error('Consensus lost');
    vue.status = 'consensus lost';
}

function _onHeadChanged() {
    vue.height = $.blockchain.height;

    if(vue.blocks.length) {
        getBlockInfo($.blockchain.headHash, function(blockInfo) {
            vue.blocks.unshift(blockInfo);
        });
    }
}

function _onPeersChanged() {
    vue.peerCount = $.network.peerCount;
}

Nimiq.init(function($) {
    vue.status = 'synchronizing';

    window.$ = $;

    $.consensus.on('syncing', function(targetHeight) {
        vue.status = 'synchronizing';
        vue.targetHeight = targetHeight;
    });
    $.consensus.on('established', _onConsensusEstablished);
    $.consensus.on('lost', _onConsensusLost);

    $.blockchain.on('head-changed', _onHeadChanged);
    _onHeadChanged();

    $.network.on('peers-changed', _onPeersChanged);

    $.network.connect();
}, function(error) {
    console.error(error);
    alert(error);
});


function getLatestBlocks() {
    if(vue.blocks.length > 1) return;

    console.log("Getting latest blocks");

    var blockStore = [];

    var _accumulateBlocks = function(blockInfo) {
        blockStore.push(blockInfo);

        if(blockStore.length === 20) {
            blockStore.sort(function(a, b) {
                if(a.height < b.height) return 1;
                else return -1;
            });

            vue.blocks = blockStore;
        }
    };

    var hashes = $.blockchain.path.slice(-20);

    // Query all blocks' info
    for(var i = 0; i < hashes.length; i++) {
        getBlockInfo(hashes[i], _accumulateBlocks);
    }
}

function getBlockInfo(hash, callback) {
    if(typeof hash === "string") {
        hash = Nimiq.Hash.fromHex(hash);
    }

    $.blockchain.getBlock(hash).then(function(block) {
        if(!block) {
            callback(null);
            return;
        }

        var blockInfo = {
            hash:             hash.toHex(),
            height:           block.height,
            timestamp:        block.timestamp,
            difficulty:       block.difficulty,
            serializedSize:   block.serializedSize,
            minerAddr:        block.minerAddr.toHex(),
            transactionCount: block.transactionCount,
            transactions:     block.transactions,
            transactionValue: block.transactions.reduce(function(acc, tx) { return tx.value + acc; }, 0),
            prevHash:         block.prevHash.toHex(),
            nonce:            block.nonce
        };

        if(!blockInfo.transactionCount) callback(blockInfo);
        else {
            for(var i = 0; i < blockInfo.transactionCount; i++) {
                getSenderAddrAndResolve(blockInfo.transactions[i], blockInfo, callback);
            }
        }
    });
}

function getSenderAddrAndResolve(tx, blockInfo, callback) {
    tx.getSenderAddr().then(function(address) {
        blockInfo.transactions[blockInfo.transactions.indexOf(tx)].senderAddr = address;

        var unresolvedTx = blockInfo.transactions.filter(function(tx) {
            return !tx.senderAddr;
        });

        if(!unresolvedTx.length) {
            callback(blockInfo);
        }
    });
}
