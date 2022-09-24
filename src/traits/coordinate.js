import debounce from "lodash.debounce";
import { roundToDigits } from "../helpers/roundToDigits";

export default (editor, config = {}) => {
    const tm = editor.TraitManager;

    tm.addType('coordinate', {
        createInput({ component }) {
          const el = document.createElement('div');
          el.innerHTML = `
            <input type="text" class="lat"></input>
            <input type="text" class="lng"></input>
            ${component.view.el.centerOnSelf ? `<button class="focusonself">Current location</button>` : ''}
          `;
          const changeLatLgn = (lat, lng) => {
            component.addAttributes({ coordinate: JSON.stringify([roundToDigits(lat, 4), roundToDigits(lng, 4)]) });
          }
          const debouncedChangeLatLgn = debounce(changeLatLgn, 100);
          el.querySelector("input.lat").addEventListener("change", function (event) {
            const lat = el.querySelector("input.lat").value;
            const lng = el.querySelector("input.lng").value;
            debouncedChangeLatLgn(lat, lng);
          });
          el.querySelector("input.lng").addEventListener("change", function (event) {
            const lat = el.querySelector("input.lat").value;
            const lng = el.querySelector("input.lng").value;
            debouncedChangeLatLgn(lat, lng);
          });
          component.view.el.centerOnSelf && el.querySelector(".focusonself").addEventListener("click", async function(event) {
            const [lat, lng] = await component.view.el.centerOnSelf();
            debouncedChangeLatLgn(lat, lng);
          });
          return el;
        },
        onUpdate({ elInput: el, component }) {
            const [lat, lng] = JSON.parse(component.getAttributes().coordinate?.trim() || '[]');
            const latinput = el.querySelector("input.lat");
            const lnginput = el.querySelector("input.lng");
            if(latinput.value !== `${lat}`) {
              latinput.value = lat || '-27.4498';
              latinput.dispatchEvent(new CustomEvent('change'));
            }
            if(lnginput.value !== `${lng}`) {
              lnginput.value = lng || '-232.9102';
              lnginput.dispatchEvent(new CustomEvent('change'));
            }
        }
      });
}