<template>
  <div>
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
  <hr/>
  <MGBar/>
  <hr/>
 </div>
</template>

<script>
    import {timeFormat} from 'd3-time-format'
    import {json} from 'd3-fetch'
    import {format} from 'd3-format'

    import BarChart1 from '@/components/Charts/Bar1'
    import MGBar from '@/components/MGBar'
    import BarFS from '@/components/BarFS'
    export default {
        components: {
            BarChart1,
            MGBar,
            BarFS
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
                    y: ['Avg of HotMetal Weight', 'Sum of HotMetal Weight/1000']
                },
                name: 'Avg and Sum of HM WGT "\nVS"\n Start Sulfur'
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
                        "avg HM WGT": Number(item['HM WGT TONS'].avg),
                        "sum HM Wg": Number(item['HM WGT TONS'].sum)
                      })
                      
                    }
                    return dataObject;
                } )
             
                this.columns = ["avg HM WGT","sum HM Wg"]
                this.data = data
                this.loaded = true
            }
        }
    }
</script>