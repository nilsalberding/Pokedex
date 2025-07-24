Chart.defaults.font = {
    family: 'Courier New, Courier, monospace',
    size: 14,
};

Chart.defaults.color = '#000';

function getStatsChart(index) {

    const ctx = document.getElementById('myChart');

    const data = {
        labels: [
            'HP',
            'Atk',
            'Def',
            'Sp. Atk',
            'Sp. Def',
            'Speed'
        ],
        datasets: [{
            label: pokeArray[index].name,
            data: [
                pokeArray[index].stats.hp,
                pokeArray[index].stats.attack,
                pokeArray[index].stats.defense,
                pokeArray[index].stats.special_attack,
                pokeArray[index].stats.special_defense,
                pokeArray[index].stats.speed
            ],
            fill: true,
            backgroundColor: '#fff5cd86',
            borderColor: '#ffcb05',
            pointBackgroundColor: '#ffcd0550',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    };

    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 150
                }
            },
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        }
    })};
