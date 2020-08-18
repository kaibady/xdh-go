export default function($, go, options) {
    if(options instanceof Array) {
        let arr = []
        options.forEach(r => {
            arr.push(new go.AnimationTrigger(r))
        })

        return arr
    } else {
        return []
    }
}