# Sample of Reported Titles

* [Excel](/dictionary/30.1/excel/sample_of_reported_titles.html)
* [Text](/dictionary/30.1/text/sample_of_reported_titles.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/sample_of_reported_titles.html)
* [Oracle](/dictionary/30.1/oracle/sample_of_reported_titles.html)

| **Purpose:** | Provide job titles reported during O*NET data collection. |
| **Table Name:** | sample_of_reported_titles |
| **Download:** | [30_sample_of_reported_titles.sql](/dl_files/database/db_30_1_mysql/30_sample_of_reported_titles.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| reported_job_title | Character Varying(150) | Title from incumbents or occupational experts |
| shown_in_my_next_move | Character(1) | Whether title is shown on My Next Move career page (Y=yes, N=no) |

This file contains job titles frequently reported by incumbents and occupational experts on data collection surveys. These titles are displayed on occupational reports in the O*NET OnLine and O*NET Code Connector web applications; up to 10 titles for each occupation are displayed and included in this file. Up to 4 titles are also displayed in My Next Move, My Next Move for Veterans, and Mi Próximo Paso; the titles shown in these applications are marked with a Y in the “Shown in My Next Move” column.

The file is displayed in three tab delimited fields with the columns named O*NET-SOC Code, Reported Job Title, and Shown in My Next Move. The three fields are represented by one row. There are a total of 7,955 rows of data in this file.

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 20.1 | Added as a new file |
| 20.2 - 30.1 | No structure changes |

### Data Example - sample_of_reported_titles:

| onetsoc_code | reported_job_title | shown_in_my_next_move |
| --- | --- | --- |
| 17-2071.00 | Circuits Engineer | N |
| 17-2071.00 | Design Engineer | Y |
| 17-2071.00 | Electrical Controls Engineer | N |
| 17-2071.00 | Electrical Design Engineer | Y |
| 17-2071.00 | Electrical Engineer | Y |
| 17-2071.00 | Electrical Project Engineer | N |
| 17-2071.00 | Engineer | N |
| 17-2071.00 | Instrumentation and Electrical Reliability Engineer (I&E Reliability Engineer) | N |