<template>
    <v-navigation-drawer
        v-model="drawer"
        id="sidebar__content"
        color="primary"
        class="sidebar__content position-fixed"
        permanent
        expand-on-hover
        :rail="rail"
        fixed
    >
        <v-list
        nav
        density="compact"
        class="pa-0"
        open-strategy="single"
        v-model:opened="openedGroup"
        >
        <template v-for="(item, i) in sidebarMenu"
                    :key="i"
        >
            <v-list-item
            v-if="item.page"
            :prepend-icon="item.icon"
            :title="item.text"
            :value="item"
            @click="handleItemClick(item)"
            class="ma-2"
            >
            </v-list-item>
        </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>

</script>

<style scoped>
    
</style>