<!--
	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts" setup>
	import { type HTMLAttributes, computed } from "vue"
	import { Search } from "lucide-vue-next"
	import { ComboboxInput, type ComboboxInputProps, useForwardProps } from "radix-vue"
	import { cn } from "@/lib/utils"

	defineOptions({
		inheritAttrs: false,
	})

	const props = defineProps<ComboboxInputProps & {
		class?: HTMLAttributes["class"]
	}>()

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props

		return delegated
	})

	const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<div class="flex items-center border-b px-3" cmdk-input-wrapper>
		<Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
		<ComboboxInput
			:class="cn('flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', props.class)"
			v-bind="{ ...forwardedProps, ...$attrs }"

			auto-focus
		/>
	</div>
</template>
