/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type * as z from "zod"
import type { Ref } from "vue"
import { computed, ref, watch } from "vue"
import { useFieldValue, useFormValues } from "vee-validate"
import { createContext } from "radix-vue"
import { type Dependency, DependencyType, type EnumValues } from "./interface"
import { getFromPath, getIndexIfArray } from "./utils"

export const [injectDependencies, provideDependencies] = createContext<Ref<Dependency<z.infer<z.ZodObject<any>>>[] | undefined>>("AutoFormDependencies")

export default function useDependencies(
	fieldName: string,
) {
	const form = useFormValues()
	// parsed test[0].age => test.age
	const currentFieldName = fieldName.replace(/\[\d+\]/g, "")
	const currentFieldValue = useFieldValue<any>(fieldName)

	if (!form)
		throw new Error("useDependencies should be used within <AutoForm>")

	const dependencies = injectDependencies()
	const isDisabled = ref(false)
	const isHidden = ref(false)
	const isRequired = ref(false)
	const overrideOptions = ref<EnumValues | undefined>()

	const currentFieldDependencies = computed(() => dependencies.value?.filter(
		dependency => dependency.targetField === currentFieldName,
	))

	function getSourceValue(dep: Dependency<any>) {
		const source = dep.sourceField as string
		const index = getIndexIfArray(fieldName) ?? -1
		const [sourceLast, ...sourceInitial] = source.split(".").reverse()
		const [_targetLast, ...targetInitial] = (dep.targetField as string).split(".").reverse()

		if (index >= 0 && sourceInitial.join(",") === targetInitial.join(",")) {
			const [_currentLast, ...currentInitial] = fieldName.split(".").reverse()
			return getFromPath(form.value, currentInitial.join(".") + sourceLast)
		}

		return getFromPath(form.value, source)
	}

	const sourceFieldValues = computed(() => currentFieldDependencies.value?.map(dep => getSourceValue(dep)))

	const resetConditionState = () => {
		isDisabled.value = false
		isHidden.value = false
		isRequired.value = false
		overrideOptions.value = undefined
	}

	watch([sourceFieldValues, dependencies], () => {
		resetConditionState()
		currentFieldDependencies.value?.forEach((dep) => {
			const sourceValue = getSourceValue(dep)
			const conditionMet = dep.when(sourceValue, currentFieldValue.value)

			switch (dep.type) {
				case DependencyType.DISABLES:
					if (conditionMet)
						isDisabled.value = true

					break
				case DependencyType.REQUIRES:
					if (conditionMet)
						isRequired.value = true

					break
				case DependencyType.HIDES:
					if (conditionMet)
						isHidden.value = true

					break
				case DependencyType.SETS_OPTIONS:
					if (conditionMet)
						overrideOptions.value = dep.options

					break
			}
		})
	}, { immediate: true, deep: true })

	return {
		isDisabled,
		isHidden,
		isRequired,
		overrideOptions,
	}
}
