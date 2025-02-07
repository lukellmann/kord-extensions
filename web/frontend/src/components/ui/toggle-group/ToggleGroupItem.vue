<!--
	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts" setup>
	import type { VariantProps } from "class-variance-authority"
	import { type HTMLAttributes, computed, inject } from "vue"
	import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from "radix-vue"
	import { toggleVariants } from "@/components/ui/toggle"
	import { cn } from "@/lib/utils"

	type ToggleGroupVariants = VariantProps<typeof toggleVariants>

	const props = defineProps<ToggleGroupItemProps & {
		class?: HTMLAttributes["class"]
		variant?: ToggleGroupVariants["variant"]
		size?: ToggleGroupVariants["size"]
	}>()

	const context = inject<ToggleGroupVariants>("toggleGroup")

	const delegatedProps = computed(() => {
		const { class: _, variant, size, ...delegated } = props
		return delegated
	})

	const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<ToggleGroupItem
		:class="cn(toggleVariants({
      variant: context?.variant || variant,
      size: context?.size || size,
    }), props.class)" v-bind="forwardedProps"
	>
		<slot />
	</ToggleGroupItem>
</template>
