template.globalHashrateChart = tmpl('template-global-hashrate-chart');

function _globalHashrate(range, skipRender) {
    range      = range || 'week';
    skipRender = skipRender || false;

    if(!skipRender) {
        // Only replace infobox contents when not coming from the range toggle
        $infobox.innerHTML = template.globalHashrateChart();
        window.scrollTo(0, $infobox.offsetTop - 100);
    }

    fetch('https://api.nimiq.watch/statistics/difficulty/' + range).then(function(response) {
        response.json().then(function(data) {
            var difficulty = data.map(function(block) { return block['difficulty']; });
            var timestamp  = data.map(function(block) { return block['timestamp']; });

            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            // Calculate hashrate from difficulty
            var hashrate  = difficulty.map(function(diff) { return Math.round(diff * Math.pow(2, 16) / Nimiq.Policy.BLOCK_TIME); });
            var timelabel = timestamp.map(function(time) {
                var date = new Date(time * 1000);
                return date.getDate() + ". " + months[date.getMonth()] + " " + date.toTimeString().slice(0, 5);
            });

            var _renderGlobalHashrateChart = function() {
                try {
                    $infobox.removeChild($infobox.getElementsByClassName('blocklist-loader')[0]);
                }
                catch(e) {}

                $infobox.getElementsByClassName('chart-valid-info')[0].innerHTML = "Created " + (new Date()).toLocaleString();

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
                            data: hashrate
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
                                    beginAtZero: true,
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
        });
    });
}

function _humanReadableHashesPerSecond(arg1, arg2) {
    var value;
    if(typeof arg1 === "number")
        value = arg1;
    else
        value = arg1.yLabel;

    var resultValue = 0;
    var resultUnit = "";

    const unit_prefix = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z'];

    for (let i = 0; i < unit_prefix.length - 1; i++) {
        if (value < 1000) {
            resultValue = value;
            resultUnit = unit_prefix[i] + "H/s";
            break;
        }
        value = value / 1000;
    }

    if(arg2) {
        resultValue = Math.round(resultValue * 100) / 100;
    }

    return resultValue + " " + resultUnit;
}

function switchGlobalHashrateRange(range) {
    _globalHashrate(range, true);
}
