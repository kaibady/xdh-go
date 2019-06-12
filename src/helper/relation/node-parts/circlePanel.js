import verPanel from './verPanel'
export default function($, go, options) {
    return $(go.Panel, 'Spot', verPanel($, go, options))
}