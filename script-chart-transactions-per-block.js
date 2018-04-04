template.transactionsPerBlockChart = tmpl('template-transactions-per-block-chart');

async function _transactionsPerBlock() {
    $infobox.innerHTML = template.transactionsPerBlockChart();
    window.scrollTo(0, $infobox.offsetTop - 100);

    var transactionCount = [],
        transactionValue = [],
        height           = [];

    var countAcc = 0,
        valueAcc = 0,
        counter  = 0;

    // Set start time to 24h ago
    var startTime = Math.round(Date.now() / 1000) - 60 * 60 * 24;

    for(var i = 0; i < $.blockchain.path.length; i++) {
        const block = await $.blockchain.getBlock($.blockchain.path[i]);

        if(block.timestamp >= startTime) {
            counter++;

            countAcc += block.transactionCount;
            valueAcc += block.transactions.reduce(function(acc, tx) { return tx.value + acc; }, 0);

            if(counter >= 10) {
                transactionCount.push(countAcc);
                transactionValue.push(valueAcc);
                height.push((block.height - counter + 1) + "-" + block.height);

                countAcc = 0;
                valueAcc = 0;
                counter  = 0;
            }
        }
    }

    if(counter > 0) {
        transactionCount.push(countAcc);
        transactionValue.push(valueAcc);
        height.push(($.blockchain.height - counter + 1) + "-" + $.blockchain.height);
    }

    transactionValue = transactionValue.map(value => Nimiq.Policy.satoshisToCoins(value));

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
                labels: height,
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
                    yAxes: [{
                        id: 'transactionCount',
                        position: 'left',
                        scaleLabel: {
                            display: true,
                            labelString: "Transactions",
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontSize: 16
                        }
                    },
                    {
                        id: 'transactionValue',
                        position: 'right',
                        scaleLabel: {
                            display: true,
                            labelString: "Transaction Volume",
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontSize: 16
                        }
                    }]
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
}
