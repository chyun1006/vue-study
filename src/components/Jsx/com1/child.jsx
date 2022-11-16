const list = [
    { id: 0, title: '1' },
    { id: 1, title: '2' },
    { id: 2, title: '3' },
    { id: 3, title: '4' },
];
export default {
    render() {
        console.log('child')
        return (
            <ul>
                {list.map((item) => {
                    // const titleSlot = this.$scopedSlots.title && this.$scopedSlots.title(item);
                    return <li>{this.$scopedSlots.title?this.$scopedSlots.title({ data: item }):item.title}</li>;
                })}
            </ul>
        );
    },
};
