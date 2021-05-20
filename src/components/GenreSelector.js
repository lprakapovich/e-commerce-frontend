const GenreSelector = {
    render: () => {
        return `
            <label for="genres">Choose a genre:</label>
            <select name="genres" id="genre">
            <option></option>
                <option value="Classic">Classic</option>
                <option value="Adventure">Adventure</option>
                <option value="Fiction">Fiction</option>
                <option value="Historical">Historical</option>
                <option value="Biography">Biography</option>
                <option value="ComicBook">Comic Book</option>
            </select>
        `;
    },
    after_render: () => {

    }
}

export default GenreSelector;