<script lang="ts">
import { cssVarKey, themeKey } from '../../utils/useInjection';

export default defineComponent({
  name: 'LayerGlobalStyle',

  setup() {
    const theme = inject(themeKey);
    const cssVar = inject(cssVarKey);
    const { body } = document;
    const { style } = body;
    let styleApplied = false;
    onBeforeMount(() => {
      watchEffect(() => {
        if (styleApplied || !body.hasAttribute('layer-styled')) {
          body.setAttribute('layer-styled', '');
          styleApplied = true;
          if (theme?.value) {
            style.setProperty('--layer-theme', theme.value);
          }
          if (cssVar?.value) {
            Object.keys(cssVar.value).forEach(key => {
              style.setProperty(key, cssVar.value[key]);
            });
          }
        }
      });
    });
    onUnmounted(() => {
      if (styleApplied) {
        body.removeAttribute('layer-styled');
      }
    });
  },
});
</script>
