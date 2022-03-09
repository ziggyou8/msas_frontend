// Toggle sidebar on Menu button click
$('#sidebarCollapse').on('click', function() {
    $('#sidebar').toggleClass('active');
    $('#body').toggleClass('active');
});

//Datatable
$(document).ready(function() {
    $('#dataTables-example').DataTable({
        responsive: true,
        pageLength: 10,
        searching: true,
        ordering: true,
        language: {
            "url": "//cdn.datatables.net/plug-ins/1.10.22/i18n/French.json"
            //"url": "../libs/datatables/French.json"
        }
    });
} );


// Pie chart
var chart3 = document.getElementById("piechart");
var myChart3 = new Chart(chart3, {
    type: 'pie',
    data: {
        labels: ["Remboursé", "Retour", "En cours", "Octroyé"],
        datasets: [{
            data: ["75", "13", "7", "15"],
            backgroundColor: ["#00173F", "#DD2C00", "#FFAB00", "#43A047"],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: { display: true, fullWidth: true, position: 'right', },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var allData = data.datasets[tooltipItem.datasetIndex].data;
                    var tooltipLabel = data.labels[tooltipItem.index];
                    var tooltipData = allData[tooltipItem.index];
                    var total = 0;
                    var label = tooltipLabel.split(" - ");
                    for (var i in allData) { total += allData[i]; }
                    var tooltipPercentage = Math.round((tooltipData / total) * 100);
                    return label[0] + ' (' + tooltipPercentage + '%)';
                }
            }
        },
    }
});


// Bar chart
var chart2 = document.getElementById('barchart');
var myChart2 = new Chart(chart2, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Income',
            backgroundColor: "#DD2C00",
            borderColor: "#DD2C00",
            borderWidth: 1,
            data: ["2034", "3012", "1240", "5000", "6400", "7043", "8280", "8130", "4021", "7650", "4260", "8270", "11880"],
        }]
    },
    options: {
        responsive: true,
        title: { display: false, text: 'Chart' },
        legend: { position: 'top', display: false, },
        tooltips: { mode: 'index', intersect: false, },
        hover: { mode: 'nearest', intersect: true },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Mois'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Valeur'
                }
            }]
        }
    }
});