import iconShape from './iconShape';
import textBlock from './textBlock';
export default function($, go, options) {
  return $(
    go.Panel,
    go.Panel.Vertical,
    { background: 'rgba(0, 0, 0, 0)', alignment: go.Spot.Center },
    $(
      go.Panel,
      'Spot',
      iconShape($, go, options)
    ),
    textBlock($, go, options)
  );
}
