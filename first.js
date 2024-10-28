document.addEventListener('DOMContentLoaded',function(){
    //DOMContentLoaded 이벤트가 발생하면 콜백함수 실행 ?DOM를 사용하는 이유
    const payrollSearch = document.querySelector('#search_input');
    //검색창 element를 id값으로 가져오기
    const payrollTable = document.querySelector('#table tbody');
    //테이블의 tbody element를 id값으로 가져오기

    payrollSearch.addEventListener('keyup',function() {
        //검색창 element에 keyup 이벤트 세팅, 글자 입력 시 마다 발생 
        const filterValue = payrollSearch.value.toLowerCase();
        //사용자가 입력한 검색어의 value값을 가져와 소문자로 변경하여 filterValue에 저장 ?왜 소문자로 바꾸나
        const rows = payrollTable.querySelectorAll('tr');
        //현재 tbody안에 있는 모든 tr element를 가져와 rows에 저장
        
        for(var i=0; i<rows.length; i++){
            //tr들 for문으로 순회
            var rowText=rows[i].textContent.toLowerCase();
            //현재 순회중인 tr의 textcontent를 소문자로 변경하여 rowText에 저장
            if(rowText.includes(filterValue)){
                //rowText가 filterValue를 포함하면 해당 tr은 보여지게 하고, 아니면 숨김
                rows[i].style.display='';
            }else{
                rows[i].style.display='none'
            }
        }
    });
   });

   document.addEventListener('DOMContentLoaded',function(){
    const categorySelecter =document.querySelector('#category_list');
    const markSelecter = document.querySelector('#mark_list');
    const categoryTable = document.querySelector('#table tbody');
    const selectedFilters = document.querySelector('#selected_filters');

    let selectedCategories =[];
    let selectedMarks = [];

    function filterTable(){
        const rows = categoryTable.querySelectorAll('tr');
        for(let i=0; i<rows.length; i++){
            const row2Text = rows[i].textContent.toLowerCase();
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(category => row2Text.includes(category));
            const markMatch = selectedMarks.length === 0 || selectedMarks.some(mark => row2Text.includes(mark));
            
            if(categoryMatch && markMatch){
                rows[i].style.display='';
            }else{
                rows[i].style.display='none';
            }
        }
    }

    function updateFilters(){
        document.getElementById('category_filters').innerHTML='';
        document.getElementById('mark_filters').innerHTML='';

        selectedCategories.forEach(category => {
            const tag = document.createElement('a');
            tag.textContent = category;
            tag.addEventListener('click',() => {
                selectedCategories= selectedCategories.filter(item =>item !== category );
                categorySelecter.querySelector(`option[value="${category}"]`).selected=false;
                updateFilters();
                filterTable();
            });
            document.getElementById('category_filters').appendChild(tag);
        });
        selectedMarks.forEach(mark => {
            const tag = document.createElement('a');
            tag.textContent=mark;
            tag.addEventListener('click',() => {
                selectedMarks = selectedMarks.filter(item => item !== mark);
                markSelecter.querySelector(`option[value="${mark}"]`).selected= false;
                updateFilters();
                filterTable();
            });
            document.getElementById('mark_filters').appendChild(tag);
        });
    }
   categorySelecter.addEventListener('change',function(){
    const selectedOption = categorySelecter.value.toLowerCase();
    if(selectedOption !== '분류' && !selectedCategories.includes(selectedOption)){
        selectedCategories.push(selectedOption);
    }
    updateFilters();
    filterTable();
   });
   markSelecter.addEventListener('change',function(){
    const selectedOption = markSelecter.value.toLowerCase();
    if(selectedOption !== '목체질' && !selectedMarks.includes(selectedOption)){
        selectedMarks.push(selectedOption);
    }
    updateFilters();
    filterTable();
   });
});