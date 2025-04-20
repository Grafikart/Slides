import "./app.css";
import { load } from '@starfederation/datastar/bundles/datastar-core'
import * as Plugins from '@starfederation/datastar/plugins'


load(
  ...Object.values(Plugins)
)
