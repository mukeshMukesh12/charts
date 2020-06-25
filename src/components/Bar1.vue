<template>
  <bar-chart1
    v-if="loaded"
    :data="data"
    :columns="columns"
    :colors="colors"
    :band="band"
    :names="names"
    :options="options"
    :tooltip-format="tooltipFormat"
    :axis-legend="axisLegend"
    :name="name"
  /><b v-else>Bar chart loading...</b>
</template>

<script>
    import {timeFormat} from 'd3-time-format'
    import {csv} from 'd3-fetch'
    import {format} from 'd3-format'

    import BarChart1 from '@/components/Charts/Bar1'

    export default {
        components: {
            BarChart1
        },
        data() {
            return {
                loaded: false,
                columns: [],
                data: [],
                colors: ['#98abc5', '#8a89a6'],
                band: {
                    ticks: 10,
                    format: format(".2")
                },
                names: ['Hot Metal Weight', 'Hot Metal Start Temp'],
                options: {
                    scaleLog: false,
                    legend: true,
                    tooltip: true,
                    axisCount: 2
                },
                tooltipFormat: {
                    band: format(".2"),
                    value: [d => d, format(".2f")]
                },
                axisLegend: {
                    x: 'Start Sulfur',
                    y: ['Hot Metal Weight in Tons', 'Hot Metal Start Temp']
                },
                name: 'Feb 2009, HoT Metal Weight and Start Temp with Start Sulfur'
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            async loadData() {
                const data = await csv('data.csv', d => ({
                    name: Number(d['Start Sulfur']),
                    'HM WGT TONS': Number(d['HM WGT TONS']),
                    'Hot Metal Start Temp': Number(d['Hot Metal Start Temp']) 
                }))

                this.columns = data.columns.slice(9,12)
                this.data = data.slice()
                this.loaded = true
            }
        }
    }
</script>