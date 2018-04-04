var accountHashRegExp = new RegExp('^NQ[A-Z0-9 ]{42}'),
    blockHashRegExp   = new RegExp('^[A-Fa-f0-9]{64}$');

var template = {
    blocklistBlock:            tmpl('template-blocklist-block'),
    blockInfo:                 tmpl('template-block-info'),
    txInfo:                    tmpl('template-tx-info'),
    accountInfo:               tmpl('template-account-info'),
    accountTransaction:        tmpl('template-account-transaction'),
    accountBlock:              tmpl('template-account-block'),
    about:                     tmpl('template-about'),
    charts:                    tmpl('template-charts')
};

var $infobox        = document.getElementById('infobox'),
    $searchInput    = document.getElementById('search-input'),
    $status         = document.getElementById('status'),
    $height         = document.getElementById('height');

var directNavigationTargets = ['#charts', '#about'];

var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
default_colors = default_colors.concat(default_colors, default_colors);

function _detectHashFormat(value) {
    if(value.substr(0,2) === 'NQ') {
        value = value.replace(/[\+ ]/g, '').match(/.{4}/g).join(' ');
    }

    if(accountHashRegExp.test(value)) {
        return "Account Address";
    }
    else if(blockHashRegExp.test(value) /*&& value[0] === "0" && value[1] === "0"*/) {
        return "Block or Tx Hash";
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

function _getAccountInfo(address, callback) {
    address = address.replace(/ /g, '+');
    fetch('https://api.nimiq.watch/account/' + address).then(function(response) {
        response.json().then(function(data) {
            if(data.error) alert('Error: ' + data.error);
            if(!data) alert('No data received from https://api.nimiq.watch/account/' + address + '!');

            callback(data);
        });
    });
}

function loadMoreTransactions(self, address) {
    urlAddress = address.replace(/ /g, '+');
    var limit = 10;
    var page  = parseInt(self.getAttribute('data-page'));
    var skip  = (page - 1) * limit;

    fetch('https://api.nimiq.watch/account-transactions/' + urlAddress + '/' + skip + '/' + limit).then(function(response) {
        response.json().then(function(transactions) {
            if(!transactions) alert('No data from https://api.nimiq.watch/account-transactions/' + urlAddress + '/' + skip + '/' + limit + '!');

            var list = document.createDocumentFragment();
            var item;

            for(var i = transactions.length - 1; i >= 0; i--) {
                transactions[i].isReceiver = transactions[i].receiver_address === address;

                item = document.createElement('div');
                item.innerHTML = template.accountTransaction(transactions[i]);

                list.appendChild(item.getElementsByClassName('event-item')[0]);
            }

            if(transactions.length < limit) {
                var notice = document.createElement('div');
                notice.classList.add('no-transactions');
                notice.innerText = 'No earlier transactions';
                list.appendChild(notice);
            }

            self.parentNode.insertBefore(list, self);

            if(transactions.length === limit) {
                self.setAttribute('data-page', parseInt(self.getAttribute('data-page')) + 1 );
            }
            else {
                self.parentNode.removeChild(self);
            }
        });
    });
}

function loadMoreBlocks(self, address) {
    urlAddress = address.replace(/ /g, '+');
    var limit = 10;
    var page  = parseInt(self.getAttribute('data-page'));
    var skip  = (page - 1) * limit;

    fetch('https://api.nimiq.watch/account-blocks/' + urlAddress + '/' + skip + '/' + limit).then(function(response) {
        response.json().then(function(blocks) {
            if(!blocks) alert('No data from https://api.nimiq.watch/account-blocks/' + urlAddress + '/' + skip + '/' + limit + '!');

            var list = document.createDocumentFragment();
            var item;

            for(var i = blocks.length - 1; i >= 0; i--) {
                item = document.createElement('div');
                item.innerHTML = template.accountBlock(blocks[i]);

                list.appendChild(item.getElementsByClassName('event-item')[0]);
            }

            if(blocks.length < limit) {
                var notice = document.createElement('div');
                notice.classList.add('no-transactions');
                notice.innerText = 'No earlier blocks';
                list.appendChild(notice);
            }

            self.parentNode.insertBefore(list, self);

            if(blocks.length === limit) {
                self.setAttribute('data-page', parseInt(self.getAttribute('data-page')) + 1 );
            }
            else {
                self.parentNode.removeChild(self);
            }
        });
    });
}

function switchAccountHistory(selection) {
    var $transactions = document.getElementById('infobox').getElementsByClassName('accountinfo-transactions')[0];
    var $blocks       = document.getElementById('infobox').getElementsByClassName('accountinfo-blocks')[0];

    if(selection === 'transactions') {
        $transactions.classList.remove('hidden');
        $blocks.classList.add('hidden');
    }
    else {
        $transactions.classList.add('hidden');
        $blocks.classList.remove('hidden');
    }
}

function _getBlockInfo(identifier, callback, errback) {
    identifier = encodeURIComponent(identifier);
    fetch('https://api.nimiq.watch/block/' + identifier).then(function(response) {
        response.json().then(function(data) {
            if(data.error) {
                if(errback) errback(data);
                else if(data.error !== 'Block not found') alert('Error: ' + data.error);
            }
            if(!data) {
                if(errback) errback(null);
                else alert('No data received from https://api.nimiq.watch/block/' + identifier + '!');
            }

            if(data.extra_data) {
                var buf = Nimiq.BufferUtils.fromBase64(data.extra_data);

                // Check if we can convert the extraData into ASCII
                if(buf.every(function(c) {return c >= 32 && c <= 126;})) {
                    data.extra_data = Nimiq.BufferUtils.toAscii(buf);
                }
            }

            callback(data);
        });
    });
}

function _getTransactionInfo(identifier, callback) {
    identifier = encodeURIComponent(identifier);
    fetch('https://api.nimiq.watch/transaction/' + identifier).then(function(response) {
        response.json().then(function(data) {
            if(data.error && data.error !== 'Transaction not found') alert('Error: ' + data.error);
            if(!data) alert('No data received from https://api.nimiq.watch/transaction/' + identifier + '!');

            if(data.extra_data) {
                var buf = Nimiq.BufferUtils.fromBase64(data.extra_data);

                // Check if we can convert the extraData into ASCII
                if(buf.every(function(c) {return c >= 32 && c <= 126;})) {
                    data.extra_data = Nimiq.BufferUtils.toAscii(buf);
                }
            }

            callback(data);
        });
    });
}

function _getBlockListInfoFromBlockchain(head, callback) {
    _getBlockInfo(head.height, callback, function(data) {
        // On error, retry after 2 seconds
        setTimeout(_getBlockListInfoFromBlockchain, 2000, head, callback);
    });
}

var blocklistBuilt = false;
var latestBlocks = [];

function _buildListOfLatestBlocks() {
    if(blocklistBuilt !== false) return;
    blocklistBuilt = null;

    fetch('https://api.nimiq.watch/latest/20').then(function(response) {
        response.json().then(function(data) {
            blocklistNode.removeChild(blocklistNode.getElementsByTagName('div')[0]);

            if(!data) alert("No data received from https://api.nimiq.watch/latest/20!");

            latestBlockHeight = data[data.length - 1].height;

            for(var i = 0; i < data.length; i++ ) {
                _addBlockToListOfLatestBlocks(data[i]);
            }

            blocklistBuilt = true;
        });
    });
}

var blocklistNode = document.getElementById('blocklist');

function _addBlockToListOfLatestBlocks(blockInfo) {
    if(!blockInfo) return;

    var item = document.createElement('div');
    item.classList.add('blocklist-block');

    item.innerHTML = template.blocklistBlock(blockInfo);

    blocklistNode.insertBefore(item, blocklistNode.firstChild);
}

function _onHashChange(e) {
    ga('set', 'page', location.pathname + location.search + location.hash);
    ga('send', 'pageview');

    var value = window.location.hash;

    // Remove leading '#'
    if(value[0] === "#") value = value.substring(1);

    if(value.substr(0,2) === 'NQ') {
        value = value.replace(/[\+ ]/g, '').match(/.{4}/g).join(' ');
    }

    if(value === "" || value === "search") {
        // Display homepage
        $infobox.innerText = "";
        $searchInput.value = "";
        $searchInput.focus();
        window.scrollTo(0, 0);
    }
    else if(value === "about") {
        $infobox.innerHTML = template.about();
        window.scrollTo(0, $infobox.offsetTop - 100);
    }
    else if(value === "charts") {
        $infobox.innerHTML = template.charts();
        window.scrollTo(0, $infobox.offsetTop - 100);
    }
    else if(value === "chart-wealth-distribution") {
        _wealthDistribution();
    }
    else if(value === "chart-global-hashrate") {
        _globalHashrate();
    }
    else if(value === "chart-transactions-per-block") {
        _transactionsPerBlock();
    }
    else if(value === "chart-hashing-distribution") {
        _hashingDistribution();
    }
    else {
        var format = _detectHashFormat(value);
        document.getElementById('hash-format').innerHTML = format || "<em>none</em>";

        $searchInput.value = value;

        switch(format) {
            case "Account Address":
                _getAccountInfo(value, function(accountInfo) {
                    if(!accountInfo) {
                        alert("That account cannot be found.");
                        return;
                    }

                    accountInfo.accountTransaction = template.accountTransaction;
                    accountInfo.accountBlock       = template.accountBlock;

                    $infobox.innerHTML = template.accountInfo(accountInfo);
                    window.scrollTo(0, $infobox.offsetTop - 100);
                });
                break;
            case "Block or Tx Hash":
                value = Nimiq.BufferUtils.toBase64(Nimiq.BufferUtils.fromHex(value));
            case "Block Number":
                _getBlockInfo(value, function(blockInfo) {
                    if(!blockInfo || blockInfo.error) {
                        _getTransactionInfo(value, function(txInfo) {
                            if(!txInfo || txInfo.error) {
                                alert("That block or tx hash cannot be found.");
                                return;
                            }

                            $infobox.innerHTML = template.txInfo(txInfo);
                            window.scrollTo(0, $infobox.offsetTop - 100);
                        });
                        return;
                    }

                    $infobox.innerHTML = template.blockInfo(blockInfo);
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

    if(!nimiqLoaded) return;

    var value = $searchInput.value.trim().replace(/ /g, '+');

    if(window.location.hash === "#" + value) {
        // The hashchange event does not trigger if the hash does not change
        // Thus we manually trigger the function
        window.onhashchange();
    }

    window.location.hash = "#" + value;
});

function _linkClicked(self) {
    if(window.location.hash === self.hash) {
        // The browser does not do anything, if the hash is already in the URL
        // Thus we need to trigger the link manually
        _onHashChange();
    }
}

$searchInput.focus();
if(directNavigationTargets.indexOf(window.location.hash) > -1) _onHashChange();
