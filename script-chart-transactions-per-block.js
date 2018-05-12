template.transactionsPerBlockChart = tmpl('template-transactions-per-block-chart');

async function _transactionsPerBlock(range, skipRender) {
    range      = range || 'week';
    skipRender = skipRender || false;

    if(!skipRender) {
        // Only replace infobox contents when not coming from the range toggle
        $infobox.innerHTML = template.transactionsPerBlockChart();
        window.scrollTo(0, $infobox.offsetTop - 100);
    }

    fetch(apiUrl + '/statistics/transactions/' + range).then(function(response) {
        response.json().then(function(data) {
            var transactionCount = data.map(function(block) { return block['count']; });
            var transactionValue = data.map(function(block) { return block['value']; });
            var timestamp  = data.map(function(block) { return block['timestamp']; });

            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var timelabel = timestamp.map(function(time) {
                var date = new Date(time * 1000);
                return date.getDate() + ". " + months[date.getMonth()] + " " + date.toTimeString().slice(0, 5);
            });

            var _renderTransactionsPerBlockChart = function() {
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
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: timelabel,
                        datasets: [
                        {
                            label: "Transaction Volume",
                            backgroundColor: '#F6AE2D',
                            pointBackgroundColor: 'transparent',
                            borderColor: '#F6AE2D',
                            pointRadius: 3,
                            borderWidth: 2,
                            fill: false,
                            data: transactionValue,
                            type: 'line',
                            yAxisID: 'transactionValue'
                        },
                        {
                            label: "Transactions",
                            backgroundColor: '#042146',
                            borderColor: '#042146',
                            data: transactionCount,
                            yAxisID: 'transactionCount'
                        }]
                    },

                    // Configuration options go here
                    options: {
                        legend: {
                            // display: false
                            reverse: true,
                            labels: {
                                fontFamily: "'Source Sans Pro', sans-serif",
                                fontSize: 16,
                                boxWidth: 16
                            }
                        },
                        scales: {
                            yAxes: [
                                {
                                    id: 'transactionValue',
                                    position: 'right',
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Transaction Volume",
                                        fontFamily: "'Source Sans Pro', sans-serif",
                                        fontSize: 16
                                    }
                                },
                                {
                                    id: 'transactionCount',
                                    position: 'left',
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Transactions",
                                        fontFamily: "'Source Sans Pro', sans-serif",
                                        fontSize: 16
                                    }
                                }
                            ]
                        }
                    }
                });
            };

            if(document.getElementById('chart-js-script')) {
                _renderTransactionsPerBlockChart();
            }
            else {
                var scriptTag = document.createElement('script');
                scriptTag.id = "chart-js-script";
                scriptTag.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js";
                scriptTag.onload = _renderTransactionsPerBlockChart;
                document.body.appendChild(scriptTag);
            }
        });
    });
}

function switchTransactionsPerBlockRange(range) {
    _transactionsPerBlock(range, true);
}
