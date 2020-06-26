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
    import {json} from 'd3-fetch'
    import {format} from 'd3-format'

    import BarChart1 from '@/components/Charts/Bar1'

    export default {
        name: "BarFS",
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
                names: ['Avg of Final Sulfur', 'Std Deviation of Final Sulfur'],
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
                    y: ['Avg of Final Sulfur', 'Std Deviation of Final Sulfur']
                },
                name: 'Avg of  "\nFinal Sulfur"\n  and "\nStd Deviation of Final Sulfur"\n Over Start Sulfur'
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            async loadData() {
                const data = await json('aggregriation.json').then(d=> {
                    const dataObject = [];
                    for(let i in d.aggregations['Start Sulfur'].buckets) {
                      let item = d.aggregations['Start Sulfur'].buckets[i];
                      dataObject.push({
                        "name": item.key,
                        "Avg of Final Sulfur": Number(item['Final Sulfur'].avg),
                        "Std Deviation of Final Sulfur": Number(item['Final Sulfur'].std_deviation)
                      })
                      
                    }
                    return dataObject;
                } )
             
                this.columns = ["Avg of Final Sulfur","Std Deviation of Final Sulfur"]
                this.data = data
                this.loaded = true
            }
        }
    }
</script>