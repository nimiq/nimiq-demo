template.hashingDistributionChart = tmpl('template-hashing-distribution-chart');

async function _hashingDistribution(range, skipRender) {
    range      = range || 12;
    skipRender = skipRender || false;

    if(!skipRender) {
        // Only replace infobox contents when not coming from the range toggle
        $infobox.innerHTML = template.hashingDistributionChart();
        window.scrollTo(0, $infobox.offsetTop - 100);
    }

    var blocksMinedArray = [];
    var blocksMinedSum   = 0;

    // Collect data
    fetch(apiUrl + '/statistics/miners/' + range).then(function(response) {
        response.json().then(function(data) {

            // Converting into label and data arrays
            var addresses        = data.map(function(obj) { return _labelAddress(obj.miner_address, true); });
            var blocksMined      = data.map(function(obj) { return obj.blocks_mined; });
            var totalBlocksMined = blocksMined.reduce(function(acc, val) { return acc + val; });

            // Filter out the little guys
            var minBlocksMined = 1;

            if(range === 2)       minBlocksMined = 2;
            else if(range === 12) minBlocksMined = 5;
            else if(range === 24) minBlocksMined = 8;

            var otherBlocks = 0;
            var otherMiners = 0;
            blocksMined = blocksMined.filter(function(count) {
                if(count < minBlocksMined) {
                    otherBlocks += count;
                    otherMiners++;
                    return false;
                }
                else return true;
            });

            // Adapt labels
            if(otherMiners > 0) {
                addresses = addresses.slice(0, blocksMined.length);
                addresses.push(otherMiners + ' others');

                blocksMined.push(otherBlocks);
            }

            // Convert into percentages
            // blocksMined  = blocksMined.map(function(count) { return Math.round(count / totalBlocksMined * 10000) / 100; });

            var _renderHashingDistributionChart = function() {
                try {
                    $infobox.querySelector('.hashing-distribution-chart-wrapper').removeChild($infobox.getElementsByClassName('blocklist-loader')[0]);
                }
                catch(e) {}

                $infobox.getElementsByClassName('chart-valid-info')[0].innerHTML = "Created " + (new Date()).toLocaleString();

                if(window.chart) window.chart.destroy();

                var ctxs = $infobox.getElementsByTagName('canvas')

                var ctx  = ctxs[0].getContext('2d');

                window.chart = new Chart(ctx, {
                    // The type of chart we want to create
                    type: 'doughnut',

                    // The data for our dataset
                    data: {
                        labels: addresses,
                        datasets: [
                        {
                            label: "Blocks mined",
                            data: blocksMined,
                            backgroundColor: (function() {
                                if(otherMiners > 0) {
                                    var colors = default_colors.slice();
                                    colors[blocksMined.length - 1] = Chart.defaults.global.defaultColor;
                                    return colors;
                                }
                                else return default_colors;
                            })()
                        }]
                    },

                    // Configuration options go here
                    options: {
                        legend: {
                            display: false
                        }
                    }
                });
            };

            if(document.getElementById('chart-js-script')) {
                _renderHashingDistributionChart();
            }
            else {
                var scriptTag = document.createElement('script');
                scriptTag.id = "chart-js-script";
                scriptTag.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js";
                scriptTag.onload = _renderHashingDistributionChart;
                document.body.appendChild(scriptTag);
            }
        });
    });
}

function switchHashingDistributionRange(range) {
    _hashingDistribution(range, true);
}
