import { Country } from "@/components/templates/onboarding-flow";
import countries from "world-countries";

export const COUNTRIES: Country[] = countries
  .map(country => ({
    name: country.translations?.zho?.common ?? country.name.common, // 中文名，没有则回退英文
    code: country.cca2,
    flag: country.flag,
    callingCode: country.idd.root
      ? `${country.idd.root}${country.idd.suffixes?.[0] ?? ""}`
      : "",
  }))
  .filter(c => c.callingCode)
  .sort((a, b) => a.name.localeCompare(b.name, "zh")); // 按中文排序
