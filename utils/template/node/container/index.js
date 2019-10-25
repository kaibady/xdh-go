import { shape } from '../../../node-parts';
import { containerBinding } from './bind';
export default function container($, go, _options) {
  return shape($, go, {
    props: {},
    binding: containerBinding($, go, _options)
  });
}
