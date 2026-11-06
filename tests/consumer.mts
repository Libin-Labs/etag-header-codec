import * as api from '@lp-labs/etag-header-codec';
import { parseEtags } from '@lp-labs/etag-header-codec';
console.log(parseEtags('W/"v1", "v2"'));
// @ts-expect-error invalid argument must be rejected by declarations
api.parseEtags(3);
