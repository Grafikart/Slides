import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import {startStimulusApp} from "vite-plugin-symfony/stimulus/helpers"
import UxLiveComponent from "@symfony/ux-live-component"

const app = startStimulusApp();
app.register('live', UxLiveComponent)
