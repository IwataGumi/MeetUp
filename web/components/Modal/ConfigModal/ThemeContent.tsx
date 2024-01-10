import ThemeCard, { supportedTheme } from "@/components/ThemeCard";

const ThemeContent = () => {
  const renderThemeCards = () => {
    return supportedTheme.map(theme => <ThemeCard key={theme} themeName={theme} />)
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3">
      { renderThemeCards()}
    </div>
  )
}

export default ThemeContent;
