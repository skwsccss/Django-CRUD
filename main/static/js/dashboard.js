(function($) {
  'use strict';
  $(function() {
    if ($("#growth-rate-chart").length) {
      var areaData = {
        labels: ["Jun","","Jul","","Aug","","Sep","", "Oct","", "Nov","","Dec"],
        datasets: [
          {
            data: [0, 100, 330, 300, 400, 150, 100, 205, 200, 300, 420, 400, 500],
            borderColor: [
              '#817da1'
            ],
            borderWidth: 1.5,
            fill: false,
            label: "Orders"
          },
          {
            data: [0, 50, 100, 200, 260, 215, 200, 320, 300, 470, 400, 300, 200],
            borderColor: [
              '#0acf97'
            ],
            borderWidth: 1.5,
            fill: false,
            label: "Downloads"
          },
          {
            data: [0, 25, 60, 40, 130,60, 20, 50, 110, 100, 80, 90, 50],
            borderColor: [
              '#f35958'
            ],
            borderWidth: 1.5,
            fill: false,
            label: "Growth"
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              display: true,
              padding: 10
            },
            gridLines: {
              display: false,
              drawBorder: false,
              color: 'transparent',
              zeroLineColor: '#eeeeee'
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              display: true,
              autoSkip: false,
              maxRotation: 0,
              stepSize: 100,
              min: 0,
              max: 600,
              padding: 18
            },
            gridLines: {
              display: true,
              color: '#f5f5f5',
              zeroLineColor: '#f5f5f5',
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        elements: {
          line: {
            tension: 0
          },
          point: {
            radius: 0
          }
        }
      }
      var growthRateChartCanvas = $("#growth-rate-chart").get(0).getContext("2d");
      var growthRateChart = new Chart(growthRateChartCanvas, {
        type: 'line',
        data: areaData,
        options: areaOptions
      });
    }

    if ($("#growth-rate-chart-dark").length) {
      var areaData = {
        labels: ["Jun","","Jul","","Aug","","Sep","", "Oct","", "Nov","","Dec"],
        datasets: [
          {
            data: [0, 100, 330, 300, 400, 150, 100, 205, 200, 300, 420, 400, 500],
            borderColor: [
              '#817da1'
            ],
            borderWidth: 1.5,
            fill: false,
            label: "Orders"
          },
          {
            data: [0, 50, 100, 200, 260, 215, 200, 320, 300, 470, 400, 300, 200],
            borderColor: [
              '#0acf97'
            ],
            borderWidth: 1.5,
            fill: false,
            label: "Downloads"
          },
          {
            data: [0, 25, 60, 40, 130,60, 20, 50, 110, 100, 80, 90, 50],
            borderColor: [
              '#f35958'
            ],
            borderWidth: 1.5,
            fill: false,
            label: "Growth"
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              display: true,
              padding: 10
            },
            gridLines: {
              display: false,
              drawBorder: false,
              color: 'transparent',
              zeroLineColor: '#eeeeee'
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              display: true,
              autoSkip: false,
              maxRotation: 0,
              stepSize: 100,
              min: 0,
              max: 600,
              padding: 18
            },
            gridLines: {
              display: true,
              color: 'rgba(129, 125, 161, 0.17)',
              zeroLineColor: 'rgba(129, 125, 161, 0.17)',
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        elements: {
          line: {
            tension: 0
          },
          point: {
            radius: 0
          }
        }
      }
      var growthRateChartDarkCanvas = $("#growth-rate-chart-dark").get(0).getContext("2d");
      var growthRateChartDark = new Chart(growthRateChartDarkCanvas, {
        type: 'line',
        data: areaData,
        options: areaOptions
      });
    }

    if ($("#revenue-chart").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        datasets: [{
            data: [80, 140, 105, 200, 115, 190, 50, 100, 0],
            backgroundColor: [
              '#f35958'
            ],
            borderColor: [
              'transparent'
            ],
            borderWidth: 1,
            fill: 'origin',
            label: "purchases"
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              display: true
            },
            gridLines: {
              display: false,
              drawBorder: false,
              color: 'transparent',
              zeroLineColor: '#eeeeee'
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: true,
              autoSkip: false,
              maxRotation: 0,
              stepSize: 100,
              min: 0,
              max: 300
            },
            gridLines: {
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        elements: {
          line: {
            tension: .35
          },
          point: {
            radius: 0
          }
        }
      }
      var revenueChartCanvas = $("#revenue-chart").get(0).getContext("2d");
      var revenueChart = new Chart(revenueChartCanvas, {
        type: 'line',
        data: areaData,
        options: areaOptions
      });
    }

    if ($("#revenue-chart-b").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        datasets: [{
            data: [30, 100, 45, 240, 105, 140, 70, 190, 60],
            backgroundColor: [
              '#f35958'
            ],
            borderColor: [
              'transparent'
            ],
            borderWidth: 1,
            fill: 'origin',
            label: "purchases"
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              display: true
            },
            gridLines: {
              display: false,
              drawBorder: false,
              color: 'transparent',
              zeroLineColor: '#eeeeee'
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: true,
              autoSkip: false,
              maxRotation: 0,
              stepSize: 100,
              min: 0,
              max: 300
            },
            gridLines: {
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        elements: {
          line: {
            tension: .35
          },
          point: {
            radius: 0
          }
        }
      }
      var revenueChartBCanvas = $("#revenue-chart-b").get(0).getContext("2d");
      var revenueChartB = new Chart(revenueChartBCanvas, {
        type: 'line',
        data: areaData,
        options: areaOptions
      });
    }

    if ($("#downloads-chart").length) {
      var downloadsChartCanvas = $("#downloads-chart").get(0).getContext("2d");
      var downloadsChart = new Chart(downloadsChartCanvas, {
        type: 'bar',
        data: {
          labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [{
              label: 'Profit',
              data: [280, 330, 370, 410, 290, 400, 309],
              backgroundColor: '#fff'
            },
            {
              label: 'Target',
              data: [600, 600, 600, 600, 600, 600, 600],
              backgroundColor: '#a2aaff'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 20,
              bottom: 0
            }
          },
          scales: {
            yAxes: [{
              display: true,
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                display: true,
                min: 0,
                max: 600,
                stepSize: 100,
                fontColor: "#fff"
              }
            }],
            xAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true,
                fontColor: "#fff"
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: false
              },
              barPercentage: .4
            }]
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          }
        }
      });
    }

    if ($("#downloads-chart-b").length) {
      var downloadsChartBCanvas = $("#downloads-chart-b").get(0).getContext("2d");
      var downloadsChartB = new Chart(downloadsChartBCanvas, {
        type: 'bar',
        data: {
          labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [{
              label: 'Profit',
              data: [480, 230, 470, 310, 590, 200, 209],
              backgroundColor: '#fff'
            },
            {
              label: 'Target',
              data: [600, 600, 600, 600, 600, 600, 600],
              backgroundColor: '#a2aaff'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 20,
              bottom: 0
            }
          },
          scales: {
            yAxes: [{
              display: true,
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                display: true,
                min: 0,
                max: 600,
                stepSize: 100,
                fontColor: "#fff"
              }
            }],
            xAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true,
                fontColor: "#fff"
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: false
              },
              barPercentage: .4
            }]
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          }
        }
      });
    }

    if ($("#users-chart").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [{
            data: [130, 135, 200, 140, 150, 100, 102, 120],
            backgroundColor: [
              '#0acf97'
            ],
            borderColor: [
              'transparent'
            ],
            borderWidth: 0,
            fill: 'origin',
            label: "purchases"
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              display: true
            },
            gridLines: {
              display: false,
              drawBorder: false,
              color: 'transparent',
              zeroLineColor: '#eeeeee'
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: true,
              autoSkip: false,
              maxRotation: 0,
              stepSize: 100,
              min: 0,
              max: 200
            },
            gridLines: {
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        elements: {
          line: {
            tension: 0
          },
          point: {
            radius: 0
          }
        }
      }
      var usersChartCanvas = $("#users-chart").get(0).getContext("2d");
      var usersChart = new Chart(usersChartCanvas, {
        type: 'line',
        data: areaData,
        options: areaOptions
      });
    }

    if ($("#users-chart-dark").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [{
            data: [130, 135, 200, 140, 150, 100, 102, 120],
            backgroundColor: [
              '#0acf97'
            ],
            borderColor: [
              'transparent'
            ],
            borderWidth: 0,
            fill: 'origin',
            label: "purchases"
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              display: true
            },
            gridLines: {
              display: false,
              drawBorder: false,
              color: 'transparent',
              zeroLineColor: '#eeeeee'
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: true,
              autoSkip: false,
              maxRotation: 0,
              stepSize: 100,
              min: 0,
              max: 200
            },
            gridLines: {
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        elements: {
          line: {
            tension: 0
          },
          point: {
            radius: 0
          }
        }
      }
      var usersChartCanvas = $("#users-chart-dark").get(0).getContext("2d");
      var usersChart = new Chart(usersChartCanvas, {
        type: 'line',
        data: areaData,
        options: areaOptions
      });
    }

    if ($("#customers-chart").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [{
            data: [120, 135, 70, 140, 100, 95, 142, 120],
            backgroundColor: [
              'rgba(255, 181, 72, .2)'
            ],
            borderColor: [
              'rgba(255, 181, 72, 1)'
            ],
            borderWidth: 2,
            fill: 'origin',
            label: "purchases"
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              display: true
            },
            gridLines: {
              display: false,
              drawBorder: false,
              color: 'transparent',
              zeroLineColor: '#eeeeee'
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: true,
              autoSkip: false,
              maxRotation: 0,
              stepSize: 100,
              min: 0,
              max: 200
            },
            gridLines: {
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        elements: {
          line: {
            tension: 0
          },
          point: {
            radius: 0
          }
        }
      }
      var customersChartCanvas = $("#customers-chart").get(0).getContext("2d");
      var customersChart = new Chart(customersChartCanvas, {
        type: 'line',
        data: areaData,
        options: areaOptions
      });
    }

    $('#status-report-listing').DataTable({
      "aLengthMenu": [
        [5, 10, 15, -1],
        [5, 10, 15, "All"]
      ],
      "iDisplayLength": 10,
      "language": {
        search: ""
      },
      searching: false, paging: false, info: false
    });

  });
})(jQuery);