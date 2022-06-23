
// var flag = true;



$(document).ready(function () {
    if (!localStorage.getItem("borrower")) {
  
        let arr = [];
        localStorage.setItem("borrower", JSON.stringify(arr));
    }
    else {
        $.getJSON("books.json",
            function (data) {
            
                localStorage.setItem("data", JSON.stringify(data));
                for (i in data) {
               
                
                    for (j in data[i]) {
                        // console.log(data[i][j].BookId);

                        $("#cards").append(`<div class="card" style="width: 18rem;">
                    <img class="card-img-top" src=${data[i][j].url} style="height:100%" alt="Card image cap">
                    <div class="card-body">
          <h5 class="card-title">Title: ${data[i][j].title}</h5>
          <h6>Author: ${data[i][j].author}</h6>
          <h6>Genre: ${data[i][j].genre}</h6>
          <h6>Review: ${data[i][j].review}</h6>
          <h6>Available Quantity: ${data[i][j].quantity_available}</h6>
          <h6>Unit Price: ${data[i][j].price}</h6>

          </div>
          </div>
`)

                    }
                }
            })    
        createTable();
    }
    })




function addBorrower() {
    var selected = [];
    for (var option of document.getElementById
        ('select').options) {
        if (option.selected) {
            selected.push(option.value);
        }
    }
    // alert(selected);


    $.getJSON("books.json",
        function (data) {
            let sum = 0;
            for (i in data) {
       
                for (j in data[i]) {
                    for (let z = 0; z < selected.length; z++) {
                        if (selected[z] == data[i][j].BookId) {
                            sum = sum + data[i][j].price;
                        }
                    }
                }
            }
    
   
            let obj = {
                // id:`${}`,
                name: `${document.getElementById('name').value}`,
                phone: `${document.getElementById('pNo').value}`,
                dob: `${document.getElementById('dob').value}`,
                address: `${document.getElementById('address').value}`,
                books: selected,
                total_price: sum
            }
            let arr = JSON.parse(localStorage.getItem("borrower"));
            arr.push(obj);
            localStorage.setItem("borrower", JSON.stringify(arr));
            createTable();

        })
    
  
}



function createTable() {
    let tableObj = JSON.parse(localStorage.getItem("borrower"));
    $('tbody tr').remove();
    for (let i = 0; i < tableObj.length; i++) {
        var row = `<tr>
        <td>${tableObj[i].name}</td>
        <td>${tableObj[i].phone}</td>
        <td>${tableObj[i].dob}</td>
        <td>${tableObj[i].address}</td>
        <td>${tableObj[i].total_price}</td>
        <td><button type="button"  class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addBookModal" onclick="addBook(${i})">Add book</button>
        <button type="button" data-bs-toggle="modal" data-bs-target="#returnBookModal" class="btn btn-warning" onclick="returnBook(${i})">Return</button></td>
        </tr>`
      
        $("tbody").append(row);
    }

}
function addBook(id) {
    // console.log("User is:", id);
    document.getElementById('userId').value = id;
 }

function submitBook() {
    var selected = [];
    for (var option of document.getElementById
        ('selectBook').options) {
        if (option.selected) {
            selected.push(option.value);
        }
    }
    alert(selected);
    let key=document.getElementById('userId').value;
    
    $.getJSON("books.json",
        function (data) {
            let sum = 0;
            for (i in data) {
           
                for (j in data[i]) {
                    for (let z = 0; z < selected.length; z++) {
                        if (selected[z] == data[i][j].BookId) {
                            sum = sum + data[i][j].price;
                        }
                    }
                }

            }
            
            let newSum = sum + obj[key].total_price;
            obj[key].total_price = newSum;
            for (i in selected) {
                obj[key].books.push(selected[i]);
            }
            localStorage.setItem("borrower", JSON.stringify(obj));
        }
    )
    const obj = JSON.parse(localStorage.getItem('borrower'));
    location.reload();
 }
 
function returnBook(id) {
    
    document.getElementById('returnId').value = id;

    const obj = JSON.parse(localStorage.getItem("borrower"));
    
    for (i in obj[id].books) {
       
        let temp = obj[id].books[i];
        if (temp == 1) {
            bookName="Northanger Abbey"
        } else if (temp == 2) {
            bookName = "War and Peace";
        } else if (temp == 3) {
            bookName = "Anna Karenina";
        }
        else {
            bookName=" Mrs. Dalloway"
}
        var option = `<option>${bookName}</option>`
        // console.log(option);
        $("#selectReturn").append(option);
    }

}

function confirmReturn() {
    var borrowerId = document.getElementById('returnId').value;
    var count;
    var selected = [];
    for (var option of document.getElementById
        ('selectReturn').options) {
        if (option.selected) {
            if (option.value == "Northanger Abbey") {
                count = 1;
                selected.push(count);
                
            } else if (option.value == "War and Peace") {
                count = 2;
                selected.push(count);
            } else if (option.value == "Anna Karenina") {
                count = 3;
                selected.push(count);
            } else {
                count = 4;
                selected.push(count);
            }
            
        }
    }
    alert(borrowerId);

    const returnObj = JSON.parse(localStorage.getItem("borrower"));
    const bookObj = JSON.parse(localStorage.getItem("data"));
    // alert(returnObj[borrowerId].books);
    for (i in returnObj[borrowerId].books) {
       
        for (j in selected) {
            if (returnObj[borrowerId].books[i] == selected[j]) {
                returnObj[borrowerId].books.splice(i, 1);
            //     for (k in bookObj) {
            //         if (bookObj[k].BookId == selected[j]) {
            //             console.log("price is", bookObj[k].price);
            //      }
            //  }

        }
        }



        localStorage.setItem("borrower", JSON.stringify(returnObj));
        location.reload();
}
}