<!--
	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts" setup>
	import { type HTMLAttributes, computed } from "vue"
	import {
		MenubarCheckboxItem,
		type MenubarCheckboxItemEmits,
		type MenubarCheckboxItemProps,
		MenubarItemIndicator,
		useForwardPropsEmits,
	} from "radix-vue"
	import { Check } from "lucide-vue-next"
	import { cn } from "@/lib/utils"

	const props = defineProps<MenubarCheckboxItemProps & { class?: HTMLAttributes["class"] }>()
	const emits = defineEmits<MenubarCheckboxItemEmits>()

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props

		return delegated
	})

	const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<MenubarCheckboxItem
		:class="cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      props.class,
    )"
		v-bind="forwarded"
	>
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarItemIndicator>
        <Check class="w-4 h-4" />
      </MenubarItemIndicator>
    </span>
		<slot />
	</MenubarCheckboxItem>
</template>
