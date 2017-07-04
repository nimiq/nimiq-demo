var About    = { template: '#template-about' },
    Charts   = { template: '#template-charts' },
    HashInfo = {
        // template: '#template-hashinfo',
        template: '<p>Hash: {{ hash }}, type: {{ type }}</p>',
        props: ['hash'],
        data: function() {
            return {
                obj: {}
            };
        },
        computed: {
            type: function() {
                var accountHashRegExp = new RegExp('^[A-Fa-f0-9]{40}$'),
                    blockHashRegExp   = new RegExp('^[A-Fa-f0-9]{64}$');

                if(accountHashRegExp.test(this.hash)) {
                    return 'Account Address';
                }
                else if(blockHashRegExp.test(this.hash) && this.hash.substr(0, 2) === "00") {
                    return 'Block Hash';
                }
                else if(this.hash.match(/^[0-9]*$/) && parseInt(this.hash)) {
                    return 'Block Number';
                }
                else {
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
    ]
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

        callback({
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
        });
    });
}
