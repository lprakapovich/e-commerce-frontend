const Slider = {
    render: (min, max) => {
        return `
            <div class="range-slider">
            Price 
               <span>
                    <strong> From: </strong>
                    <input  type="number" value="${min}" min="${min}" max="${max}" step="0.1"> 
                    <strong> To: </strong>
                    <input type="number" value="${max}" min="${min}" max="${max}" step="0.1">  $
                </span>
                <input value="${min}" min="${min}" max="${max}" step="0.1" type="range">
                <input value="${max}" min="${min}" max="${max}" step="0.1" type="range">
            </div>
        `
    },
    after_render: () => {
        const slider = document.querySelector('.range-slider');

        const ranges = slider.querySelectorAll('input[type="range"]'),
            values = slider.querySelectorAll('input[type="number"]');

        ranges.forEach(el => {
            el.oninput = () => {
                let min = parseFloat(ranges[0].value),
                    max = parseFloat(ranges[1].value);
                if (min > max) {
                    [min, max] = [max, min];
                }
                values[0].value = min;
                values[1].value = max;

                localStorage.setItem('minPrice', JSON.stringify(min));
                localStorage.setItem('maxPrice', JSON.stringify(max));
            }
        })

        values.forEach(val => {
            val.oninput = () => {
                let min = parseFloat(values[0].value),
                    max = parseFloat(values[1].value);

                if (min > max) {
                    let temporaryHolder = min;
                    values[0].value = max;
                    values[1].value = temporaryHolder;
                }

                ranges[0].value = min;
                ranges[1].value = max;

                localStorage.setItem('minPrice', JSON.stringify(min));
                localStorage.setItem('maxPrice', JSON.stringify(max));
            }
        })
    }
}

export default Slider;