
<script setup>
import { useRouter,useRoute   } from 'vitepress';
const router = useRouter();
const { path, data: {
  frontmatter: { redirect },
} } = useRoute();
router.go(path + redirect);
</script>