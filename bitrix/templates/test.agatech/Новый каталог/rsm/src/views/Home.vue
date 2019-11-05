<!-- xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com -->
<template>
	<div @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
		<div>
			<div>
				<form class="form-inline">
					<div class="form-group">
						<label for="file">Загрузить таблицу: </label> 
						<br>
						<br>
						<input type="file" class="form-control" id="file" :accept="SheetJSFT" @change="_change" />
						<br>
						<br>
					</div>
				</form>
			</div>
		</div>
		<div>
			<div>
				<vm-button color="primary" type="filled" :disabled="data.length ? false : true" @click="_export">Экспорт</vm-button>
			</div>
		</div>
		<div>
			<div>
				<div>
					<table class="vm-table vm-table--tbody-table">
						<thead class="vm-table--thead-table">
							<th v-for="c in cols" :key="c.key">
								{{thead[c.key]}}
							</th>
						</thead>
						<tbody class="tr-table tr-table-state-null" v-for="(r, key) in data" :key="key">
							<tr class="tr-values vs-table--tr tr-table-state-null">
								<td class="td vm-table--td" v-for="c in cols" :key="c.key">
									{{ r[c.key] }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<pre>
			{{data}}
		</pre>
	</div>
</template>

<script>
import XLSX from 'xlsx'
const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:XLSX.utils.encode_col(i), key:i}));
const _SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");
export default {
	data() {
		return {
			data: [],
			thead: [],
			cols: [],
			SheetJSFT: _SheetJSFT
	}; },
	methods: {
		_suppress(evt) { evt.stopPropagation(); evt.preventDefault(); },
		_drop(evt) {
			evt.stopPropagation(); evt.preventDefault();
			const files = evt.dataTransfer.files;
			if(files && files[0]) this._file(files[0]);
		},
		_change(evt) {
			const files = evt.target.files;
			if(files && files[0]) this._file(files[0]);
		},
		_export() {
			/* convert state to workbook */
			const ws = XLSX.utils.aoa_to_sheet(this.data);
			const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
			/* generate file and send to client */
			XLSX.writeFile(wb, "sheetjs.xlsx");
		},
		_file(file) {
			/* Boilerplate to set up FileReader */
			const reader = new FileReader();
			reader.onload = (e) => {
				/* Parse data */
				const bstr = e.target.result;
				const wb = XLSX.read(bstr, {type:'binary'});
				/* Get first worksheet */
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				/* Convert array of arrays */
				const data = XLSX.utils.sheet_to_json(ws, {header:1});
				/* Update state */
				this.data = data;
				this.data = this.data.filter(element => element.length != 0)
				this.thead = this.data[0]
				this.data.shift()
				this.cols = make_cols(ws['!ref']);
			};
			reader.readAsBinaryString(file);
		}
	}
};
</script>