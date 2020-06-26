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
        name: "MGBar",
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
                names: ['MG Kg/T', 'Actual Mg'],
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
                    y: ['Avg of MG Kg/T', 'Avg of Actual Mg']
                },
                name: 'Avg of  "\nMG Kg/T"\n  and "\nActual Mg"\n Over Start Sulfur'
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
                        "MG Kg/T": Number(item['MG Kg/T'].avg),
                        "Actual Mg": Number(item['Actual Mg'].avg)
                      })
                      
                    }
                    return dataObject;
                } )
             
                this.columns = ["MG Kg/T","Actual Mg"]
                this.data = data
                this.loaded = true
            }
        }
    }
</script>