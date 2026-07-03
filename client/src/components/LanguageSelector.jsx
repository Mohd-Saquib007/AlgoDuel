function LanguageSelector({ language, setLanguage }) {
    return (
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
        >
            <option value="cpp">C++</option>
        </select>
    );
}

export default LanguageSelector;