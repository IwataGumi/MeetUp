import ThemeCard from "@/components/ThemeCard";
import { supportedTheme } from "@/utils/static";

const ThemeContent = () => {
  const renderThemeCards = () => {
    return supportedTheme.map(theme => <ThemeCard key={theme} themeName={theme} />)
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      { renderThemeCards() }
    </div>
  )
}

export default ThemeContent;
