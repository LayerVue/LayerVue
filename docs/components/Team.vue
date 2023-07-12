<template>
  <div class="Team">
    <slot name="title"></slot>
  </div>
  <div class="Team">
    <template v-for="member in coreTeamMembers" :key="member.name">
      <TeamMember v-bind="member"></TeamMember>
    </template>
  </div>
</template>
<script setup lang="ts">
import { coreTeamMembers } from '../contributors';
</script>
<style lang="scss">
.Team {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
</style>
