

const coms = [
    {
        comName:'el-button',
        type:'primary',
        title:'主要按钮'
    },
    {
        comName:'el-button',
        type:'primary',
        title:'主要按钮'
    }
]

export default{
    render(){
        coms.map(item=>{
            return item.comName
        })
        return (
            <div>
                <div draggable='true'>
                    <el-button>ads</el-button>
                </div>
            </div>
        )
    }
}