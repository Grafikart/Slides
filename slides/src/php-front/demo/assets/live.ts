import "./app.css";
import {startStimulusApp} from "vite-plugin-symfony/stimulus/helpers"
import UxLiveComponent from "@symfony/ux-live-component"
import Alpine from 'alpinejs'

Alpine.start();
const app = startStimulusApp();
app.register('live', UxLiveComponent)
