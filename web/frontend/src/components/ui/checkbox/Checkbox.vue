<!--
	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts" setup>
	import { type HTMLAttributes, computed } from "vue"
	import type { CheckboxRootEmits, CheckboxRootProps } from "radix-vue"
	import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "radix-vue"
	import { Check } from "lucide-vue-next"
	import { cn } from "@/lib/utils"

	const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes["class"] }>()
	const emits = defineEmits<CheckboxRootEmits>()

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props

		return delegated
	})

	const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<CheckboxRoot
		:class="
      cn('peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
         props.class)"
		v-bind="forwarded"
	>
		<CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
			<slot>
				<Check class="h-4 w-4" />
			</slot>
		</CheckboxIndicator>
	</CheckboxRoot>
</template>
