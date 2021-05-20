const GenreSelector = {
    render: () => {
        return `
            <label for="genres">Choose a genre:</label>
            <select name="genres" id="genre">
                <option></option>
                <option value="Adventure">Adventure</option>
                <option value="Classics">Classics</option>
                <option value="ComicBook">Comic Book</option>
                <option value="Detective">Detective</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Historical">Historical</option>
                <option value="Horror">Horror</option>
            </select>
        `;
    },

    after_render: (genre) => {
        if (genre) {
            const selector = document.getElementById('genre');
            if (Array.from(selector.getElementsByTagName('option')).find(option => option.value === genre)) {
                selector.value = genre;
            }
        }
    }
}

// TODO use dynamic values
export default GenreSelector;