<template>
    <div v-show="links.length > 3">
        <div class="flex flex-wrap -mb-1">
            <template v-for="(link, key) in links" :key="key">
                <div v-if="link.url === null" :key="`${key}-disabled`"
                     class="mr-1 mb-1 px-2 py-3 text-base leading-4 text-gray-400 hover:text-black text-bold"
                     v-html="__(link.label)"/>
                <Link v-else :key="key"
                      class="mr-1  mb-1 px-2 py-3  leading-4 hover:text-gray-700  text-gray-400 "
                      :class="{ 'text-black font-bold underline': link.active }" :href="link.url">
                    <span v-html="__(link.label)"></span>
                </Link>
            </template>
        </div>
    </div>
</template>

<script>
import {Link} from "@inertiajs/vue3";


export default {
    components: {
        Link
    },
    props: {
        links: Array,
    }
}
</script>

