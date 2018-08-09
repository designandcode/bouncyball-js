/**
 *  Seeds an array in a random way from config array.
 *  @param {number} total The number of elements to fill the array with
 *  @param {array} dist The config array representing percentage of each element
 */
export default function SeedArray (total, dist) {

    // Create a new empty array to fill and return
    let seededArray = []

    // Convert fraction to number based on total
    for (let i = 0; i < dist.length; i++) {
      let element = dist[i];

      for (el in element) {
        if (element.hasOwnProperty(el)) {
          element[el] = Math.round(element[el] * total);
        }
      }
    }    

    // Fill the seededArray with random element types while
    // there are remaining element types to pick from
    for (let i = 0; i < total; i++) {

      // Pick an element type randomly
      var idx = Math.floor(dist.length * Math.random());
      var el = dist[idx];
      var element = Object.keys(el)[0];

      // Decrease the available amount of this element type by 1
      // until there are no more of this element type available
      if (el[element] > 0) {
        el[element]--;
      } else {
        // If there are no more of this type available, remove it
        // from being selected randomly, then select a remaining
        // element type randomly
        idx = Math.floor(dist.splice(idx, 1).length * Math.random());
        el = dist[idx];
        element = Object.keys(el)[0];
      }

      // Push the randomly select element type to the seededArray
      seededArray.push(element);
    }

    return seededArray;
}
