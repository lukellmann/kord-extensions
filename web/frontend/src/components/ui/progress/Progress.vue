<!--
	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts" setup>
	import { type HTMLAttributes, computed } from "vue"
	import {
		ProgressIndicator,
		ProgressRoot,
		type ProgressRootProps,
	} from "radix-vue"
	import { cn } from "@/lib/utils"

	const props = withDefaults(
		defineProps<ProgressRootProps & { class?: HTMLAttributes["class"] }>(),
		{
			modelValue: 0,
		},
	)

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props

		return delegated
	})
</script>

<template>
	<ProgressRoot
		:class="
      cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        props.class,
      )
    "
		v-bind="delegatedProps"
	>
		<ProgressIndicator
			:style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
			class="h-full w-full flex-1 bg-primary transition-all"
		/>
	</ProgressRoot>
</template>
