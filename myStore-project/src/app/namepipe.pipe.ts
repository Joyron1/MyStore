import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namepipe'
})
export class NamepipePipe implements PipeTransform {

  transform(products: any, productsSearch: any, searchOption: any): any {
    console.log("productsSearch:", productsSearch)
    console.log("arr:", products)
    console.log("searchOption:", searchOption)
    let filteredArray = [];

    if (productsSearch == null) {
      return products;
    }

    products.map(item => {

      if (item[searchOption] == productsSearch)
        filteredArray.push(item)

      else if (item[searchOption].toLowerCase().startsWith(productsSearch.toLowerCase())) {
        filteredArray.push(item)
      }
    })
    return filteredArray;

  }

}
