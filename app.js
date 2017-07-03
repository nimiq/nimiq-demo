function _onConsensusEstablished() {
    document.getElementById('targetHeight').style.display = "none";
    $status.innerText = 'connected';
    $status.classList.add('consensus-established');
    document.getElementById('search-submit').removeAttribute('disabled');
    document.getElementById('search-submit').removeAttribute('title');

    _buildListOfLatestBlocks();

    if(!window.onhashchange) {
        window.onhashchange = _onHashChange;
        _onHashChange();
    }
}

function _onConsensusLost() {
    console.error('Consensus lost');
    $status.innerText = 'consensus lost';
    $status.classList.remove('consensus-established', 'synchronizing');
}

function _onHeadChanged() {
    var height = $.blockchain.height;
    document.getElementById('height').innerText = '#' + height;

    if(blocklistBuilt) {
        _getBlockInfo($.blockchain.headHash, function(blockInfo) {
            _addBlockToListOfLatestBlocks(blockInfo);
        });
    }
}

function _onPeersChanged() {
    document.getElementById('monitor').setAttribute('title', 'Connected to ' + $.network.peerCount + ' peers');
}

Nimiq.init(function($) {
    $status.innerText = 'synchronizing';
    $status.classList.add('synchronizing');

    window.$ = $;

    $.consensus.on('syncing', function(targetHeight) {
        document.getElementById('targetHeight').innerText = "/" + targetHeight;
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




// Dummy object to prevent JS errors
window.$ = {
    consensus: {
        established: false
    }
};

var accountHashRegExp = new RegExp('^[A-Fa-f0-9]{40}$'),
    blockHashRegExp   = new RegExp('^[A-Fa-f0-9]{64}$');

var tmpl = {
    blocklistBlock:          tmpl('template-blocklist-block'),
    blockInfo:               tmpl('template-block-info'),
    accountInfo:             tmpl('template-account-info'),
    about:                   tmpl('template-about'),
    charts:                  tmpl('template-charts'),
    wealthDistributionChart: tmpl('template-wealth-distribution-chart'),
    globalHashrateChart:     tmpl('template-global-hashrate-chart')
};

var $infobox     = document.getElementById('infobox'),
    $searchInput = document.getElementById('search-input'),
    $status      = document.getElementById('status');

var directNavigationTargets = ['#search', '#charts', '#about'];

function _detectHashFormat(value) {
    if(accountHashRegExp.test(value)) {
        return "Account Address";
    }
    else if(blockHashRegExp.test(value) && value[0] === "0" && value[1] === "0") {
        return "Block Hash";
    }
    else if(value.match(/^[0-9]*$/) && parseInt(value)) {
        return "Block Number";
    }
}

function _formatBalance(value) {
    // If the value has no decimal places below 0.01, display 0 decimals
    if(parseFloat(value.toFixed(2)) === value) {
        return value.toFixed(2);
    }
    // Otherwise, all required decimals will be displayed automatically
    else return value;
}

function _getBlockInfo(hash, callback) {
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

function _getAndWriteSenderAddressHash(tx, elementId) {
    tx.getSenderAddr().then(function(address) {
        document.getElementById(elementId).innerHTML = '<a href="#' + address.toHex() + '" onclick="_linkClicked(this);">' + address.toHex() + '</a>';
    });
}

var blocklistBuilt = false;
var latestBlocks = [];

function _buildListOfLatestBlocks() {
    if(blocklistBuilt !== false) return;
    blocklistBuilt = null;

    var _accumulateBlocks = function(blockInfo) {
        latestBlocks.push(blockInfo);

        if(latestBlocks.length === 20) {
            latestBlocks.sort(function(a, b) {
                if(a.height < b.height) return -1;
                else return 1;
            });

            blocklistNode.removeChild(blocklistNode.getElementsByTagName('div')[0]);

            for(var i = 0; i < latestBlocks.length; i++ ) {
                _addBlockToListOfLatestBlocks(latestBlocks[i]);
            }

            latestBlocks = null;
            blocklistBuilt = true;
        }
    };

    var hashes = $.blockchain.path.slice(-20);

    // Query all blocks' info
    for(var i = 0; i < hashes.length; i++) {
        _getBlockInfo(hashes[i], _accumulateBlocks);
    }
}

var blocklistNode = document.getElementById('blocklist');

function _addBlockToListOfLatestBlocks(blockInfo) {
    var item = document.createElement('div');
    item.classList.add('blocklist-block');

    item.innerHTML = tmpl.blocklistBlock(blockInfo);

    blocklistNode.insertBefore(item, blocklistNode.firstChild);
}

function _onHashChange(e) {
    var value = window.location.hash;

    // Remove leading '#'
    if(value[0] === "#") value = value.substring(1);

    if(value === "" || value === "search") {
        // Display homepage
        $infobox.innerText = "";
        $searchInput.value = "";
        $searchInput.focus();
        window.scrollTo(0, 0);
    }
    else if(value === "about") {
        $infobox.innerHTML = tmpl.about();
        window.scrollTo(0, $infobox.offsetTop - 100);
    }
    else if(value === "charts") {
        $infobox.innerHTML = tmpl.charts();
        window.scrollTo(0, $infobox.offsetTop - 100);
    }
    else if(value === "chart-wealth-distribution") {
        _wealthDistribution();
    }
    else if(value === "chart-global-hashrate") {
        _globalHashrate();
    }
    else {
        var format = _detectHashFormat(value);

        $searchInput.value = value;

        switch(format) {
            case "Account Address":
                $.accounts.getBalance(Nimiq.Address.fromHex(value)).then(function(balance) {
                    var accountInfo = {
                        hash: value,
                        balance: balance.value,
                        nonce: balance.nonce
                    };

                    $infobox.innerHTML = tmpl.accountInfo(accountInfo);
                    window.scrollTo(0, $infobox.offsetTop - 100);
                });
                break;
            case "Block Hash":
                _getBlockInfo(value, function(blockInfo) {
                    if(!blockInfo) {
                        alert("That block cannot be found. It my be out of reach due to the temporary checkpoint solution. Lowest possible block: " + $.blockchain.path[0].toHex());
                        return;
                    }

                    $infobox.innerHTML = tmpl.blockInfo(blockInfo);
                    window.scrollTo(0, $infobox.offsetTop - 100);
                });
                break;
            case "Block Number":
                var currentHeight = $.blockchain.head.height;
                var pathIndex     = value - currentHeight - 1; // Should be a negative number

                if(pathIndex < -$.blockchain.path.length) {
                    alert("That block is out of reach due to the temporary checkpoint solution. Lowest possible block: " + $.blockchain.path[0].toHex());
                    return;
                }
                if(pathIndex > -1) {
                    alert("That block has not been mined yet.");
                    return;
                }

                var blockHash = $.blockchain.path.slice(pathIndex)[0];

                _getBlockInfo(blockHash, function(blockInfo) {
                    if(!blockInfo) {
                        alert("Cannot find block.");
                        return;
                    }
                    // console.log(blockInfo);

                    $infobox.innerHTML = tmpl.blockInfo(blockInfo);
                    window.scrollTo(0, $infobox.offsetTop - 100);
                });
                break;
            default:
                alert("Format cannot be detected.");
        }
    }
}

$searchInput.addEventListener('input', function(e) {
    document.getElementById('hash-format').innerHTML = _detectHashFormat(this.value) || "<em>none</em>";
});

document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();

    if(!$.consensus.established) return;

    var value = $searchInput.value;

    if(window.location.hash === "#" + value) {
        // The hashchange event does not trigger if the hash does not change
        // Thus we manually trigger the function
        window.onhashchange();
    }

    window.location.hash = "#" + value;
});

function _linkClicked(self, skipReadyCheck) {
    if(!$.consensus.established) {
        if(!skipReadyCheck) {
            return;
        }
        else {
            window.location.hash = self.hash;
            _onHashChange();
            return;
        }
    }

    if(window.location.hash === self.hash) {
        console.log("_linkClicked triggered");
        _onHashChange();
    }
}

$searchInput.focus();
if(directNavigationTargets.indexOf(window.location.hash) > -1) _onHashChange();



async function _wealthDistribution(axisType = "linear", skipRender = false) {
    if(!document.getElementById('toggle-switch-css-link')) {
        if(document.createStyleSheet) {
            document.createStyleSheet("https://cdn.jsdelivr.net/css-toggle-switch/latest/toggle-switch.css");
        }
        else {
            var linkTag = document.createElement('link');
            linkTag.rel = "stylesheet";
            linkTag.href = "https://cdn.jsdelivr.net/css-toggle-switch/latest/toggle-switch.css";
            linkTag.id = "toggle-switch-css-link";
            document.head.appendChild(linkTag);
        }
    }

    if(!skipRender) {
        // Only replace infobox contents when not coming from the scale toggle
        $infobox.innerHTML = tmpl.wealthDistributionChart();
        window.scrollTo(0, $infobox.offsetTop - 100);
    }

    var rootKey  = await $.accounts._tree._store.getRootKey();
    var rootNode = await $.accounts._tree._store.get(rootKey);

    var balances = [];

    await _resolveAccountsTreeNode(rootNode, "", balances);

    balances = balances.filter(balance => balance);
    balances.sort((a, b) => a > b ? -1 : a < b ? 1 : 0);

    balances = balances.map(balance => Nimiq.Policy.satoshisToCoins(balance));

    var _renderWealthDisributionChart = function() {
        var labels = [];
        for (var i = 1; i <= balances.length; i++) { labels.push(i); }
        labels = labels.map(label => "#" + label);

        try {
            $infobox.removeChild($infobox.getElementsByClassName('blocklist-loader')[0]);
        }
        catch(e) {}

        var time = new Date($.blockchain.head.timestamp * 1000);
        $infobox.getElementsByClassName('chart-valid-info')[0].innerHTML = "Created at block #" + $.blockchain.head.height + " - " + time.toLocaleString()

        if(window.chart) window.chart.destroy();

        var ctx = $infobox.getElementsByTagName('canvas')[0].getContext('2d');

        window.chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: labels,
                datasets: [{
                    label: "BetaNIM",
                    pointBackgroundColor: '#042146',
                    borderColor: '#042146',
                    data: balances
                }]
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: (value) => {
                                if(axisType === "linear") {
                                    return value;
                                }
                                else if(axisType === "logarithmic") {
                                    // let blockRewardInNim = Nimiq.Policy.BLOCK_REWARD / Nimiq.Policy.SATOSHIS_PER_COIN;

                                    let label = Math.round(parseFloat(value) * Nimiq.Policy.SATOSHIS_PER_COIN) / Nimiq.Policy.SATOSHIS_PER_COIN;

                                    if(label.toString()[0] !== "1" && label.toString().slice(-1) !== "1") return null;

                                    return label;
                                }
                            }
                        },
                        type: axisType,
                        scaleLabel: {
                            display: true,
                            labelString: "Balance in NIM",
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontSize: 16
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Accounts (ordered by balance)",
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontSize: 16
                        }
                    }]
                }
            }
        });

        $infobox.getElementsByTagName('input')[0].removeAttribute('disabled');
    };

    if(document.getElementById('chart-js-script')) {
        _renderWealthDisributionChart();
    }
    else {
        var scriptTag = document.createElement('script');
        scriptTag.id = "chart-js-script";
        scriptTag.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js";
        scriptTag.onload = _renderWealthDisributionChart;
        document.body.appendChild(scriptTag);
    }
}

async function _resolveAccountsTreeNode(currentNode, currentPrefix, balances) {
    currentPrefix += currentNode.prefix;
    if (currentNode.isTerminal()) {
        balances.push(currentNode.account.balance.value);
    }
    else {
        for (const childKey of currentNode.getChildren()) {
            const node = await $.accounts._tree._store.get(childKey);
            await _resolveAccountsTreeNode(node, currentPrefix, balances);
        }
    }
}

function _wealthDistributionSwitchScale(self) {
    if(self.checked) {
        _wealthDistribution("logarithmic", true);
    }
    else {
        _wealthDistribution("linear", true);
    }
}




async function _globalHashrate(skipRender = false) {
    if(!skipRender) {
        // Only replace infobox contents when not coming from the scale toggle
        $infobox.innerHTML = tmpl.globalHashrateChart();
        window.scrollTo(0, $infobox.offsetTop - 100);
    }

    // Analyze available path from the beginning, check when difficutly changes
    var difficulty = [];
    var timestamp  = [];

    for(var i = 0; i < $.blockchain.path.length; i += Nimiq.Policy.DIFFICULTY_ADJUSTMENT_BLOCKS) {
        const block = await $.blockchain.getBlock($.blockchain.path[i]);

        // Set start time to 24h ago
        var startTime = Math.round(Date.now() / 1000) - 60 * 60 * 24;

        if(block.timestamp >= startTime) {
            difficulty.push(block.difficulty);
            timestamp.push(block.timestamp);
        }
    }

    // const months = [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Calculate hashrate from difficulty
    var hashrate  = difficulty.map(diff => Math.round(diff * Math.pow(2, 16) / Nimiq.Policy.BLOCK_TIME));
    var timelabel = timestamp.map(time => {
        let date = new Date(time * 1000);
        return /*date.getDate() + ". " + months[date.getMonth()] + " " + */date.toTimeString().slice(0, 5);
    });

    var _renderGlobalHashrateChart = function() {
        try {
            $infobox.removeChild($infobox.getElementsByClassName('blocklist-loader')[0]);
        }
        catch(e) {}

        var time = new Date($.blockchain.head.timestamp * 1000);
        $infobox.getElementsByClassName('chart-valid-info')[0].innerHTML = "Created at block #" + $.blockchain.head.height + " - " + time.toLocaleString()

        if(window.chart) window.chart.destroy();

        var ctx = $infobox.getElementsByTagName('canvas')[0].getContext('2d');

        window.chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: timelabel,
                datasets: [{
                    label: "Global hashrate",
                    pointBackgroundColor: '#042146',
                    borderColor: '#042146',
                    data: hashrate,
                    steppedLine: 'after'
                }]
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: _humanReadableHashesPerSecond
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Hashrate",
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontSize: 16
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: _humanReadableHashesPerSecond
                    }
                }
            }
        });
    };

    if(document.getElementById('chart-js-script')) {
        _renderGlobalHashrateChart();
    }
    else {
        var scriptTag = document.createElement('script');
        scriptTag.id = "chart-js-script";
        scriptTag.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js";
        scriptTag.onload = _renderGlobalHashrateChart;
        document.body.appendChild(scriptTag);
    }
}

function _humanReadableHashesPerSecond(arg1, arg2) {
    if(typeof arg1 === "number")
        value = arg1;
    else
        value = arg1.yLabel;

    var resultValue = 0;
    var resultUnit = "H/s";

    if(value < 1000) {
        resultValue = value;
    }
    else {
        let kilo = value / 1000;
        if(kilo < 1000) {
            resultValue = kilo;
            resultUnit = "kH/s";
        }
        else {
            let mega = kilo / 1000;
            if(mega < 1000) {
                resultValue = mega;
                resultUnit = "MH/s";
            }
            else {
                resultValue = mega / 1000;
                resultUnit = "GH/s";
            }
        }
    }

    if(arg2) {
        resultValue = Math.round(resultValue * 100) / 100;
    }

    return resultValue + " " + resultUnit;
}
