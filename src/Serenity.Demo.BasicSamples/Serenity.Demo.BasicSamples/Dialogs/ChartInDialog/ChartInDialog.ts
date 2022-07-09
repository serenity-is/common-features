namespace Serenity.Demo.BasicSamples {

    const chartColors = ['#4E79A7', '#A0CBE8', '#F28E2B', '#FFBE7D', '#59A14F', '#8CD17D', '#B6992D', '#F1CE63', '#499894', '#86BCB6',
        '#E15759', '#FF9D9A', '#79706E', '#BAB0AC', '#D37295', '#FABFD2', '#B07AA1', '#D4A6C8', '#9D7660', '#D7B5A6'];

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.resizable()
    @Serenity.Decorators.maximizable()
    export class ChartInDialog extends Serenity.TemplatedDialog<any> {

        private areaChart: any;

        static initializePage() {
            $(function () {
                $('#LaunchDialogButton').click(function (e) {
                    (new ChartInDialog()).dialogOpen();
                });
            });
        }

        protected onDialogOpen() {
            super.onDialogOpen();

            BasicSamplesService.OrdersByShipper({}, response => {
                //@ts-ignore
                this.areaChart = new Chart(document.getElementById(
                    this.idPrefix + 'Chart') as HTMLCanvasElement, {
                        type: "bar",
                        data: {
                            labels: response.Values.map(x => x.Month),
                            datasets: response.ShipperKeys.map((shipperKey, shipperIdx) => ({
                                label: response.ShipperLabels[shipperIdx],
                                fill: true,
                                backgroundColor: chartColors[shipperIdx % chartColors.length],
                                data: response.Values.map((x, ix) => response.Values[ix][shipperKey])
                            }))
                        }
                    });
            });
        }

        protected getTemplate() {
            return "<canvas id='~_Chart'></div>";
        }

        protected getDialogOptions() {
            var opt = super.getDialogOptions();
            opt.title = 'Orders by Shipper';
            return opt;
        }
    }
}