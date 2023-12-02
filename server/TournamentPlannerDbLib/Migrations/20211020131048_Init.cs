using Microsoft.EntityFrameworkCore.Migrations;

namespace TournamentPlannerDbLib.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Firstname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lastname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Matches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Round = table.Column<int>(type: "int", nullable: false),
                    Person1Id = table.Column<int>(type: "int", nullable: true),
                    Person2Id = table.Column<int>(type: "int", nullable: true),
                    WinnerId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Matches_Persons_Person1Id",
                        column: x => x.Person1Id,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matches_Persons_Person2Id",
                        column: x => x.Person2Id,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matches_Persons_WinnerId",
                        column: x => x.WinnerId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Persons",
                columns: new[] { "Id", "Firstname", "Gender", "Lastname" },
                values: new object[,]
                {
                    { 1, "Violet", "Female", "Landor" },
                    { 30, "Berenice", "Female", "Sturzaker" },
                    { 29, "Roanna", "Male", "Caulfield" },
                    { 28, "Corina", "Male", "Simmens" },
                    { 27, "Morena", "Male", "Mault" },
                    { 26, "Othilie", "Female", "Knight" },
                    { 25, "Goran", "Female", "Henric" },
                    { 24, "Leena", "Female", "Divisek" },
                    { 23, "Mervin", "Male", "Sondon" },
                    { 22, "Stephani", "Female", "Beecraft" },
                    { 21, "Zacharia", "Male", "Brundall" },
                    { 20, "Norris", "Male", "Demkowicz" },
                    { 19, "Maurizio", "Female", "Tapscott" },
                    { 18, "Hunfredo", "Male", "Stanyon" },
                    { 17, "Imogen", "Female", "MacDuff" },
                    { 16, "Kendell", "Female", "Dawber" },
                    { 15, "Curtice", "Male", "Pepper" },
                    { 14, "Luella", "Female", "Foat" },
                    { 13, "Albert", "Male", "Syncke" },
                    { 12, "Karlie", "Female", "Iskow" },
                    { 11, "Brinna", "Male", "Le feuvre" },
                    { 10, "Pavlov", "Male", "Stealfox" },
                    { 9, "Margareta", "Male", "Feasey" },
                    { 8, "Lester", "Female", "Palatino" },
                    { 7, "Ennis", "Male", "Bottlestone" },
                    { 6, "Leena", "Female", "Cheetham" },
                    { 5, "Marc", "Male", "Clashe" },
                    { 4, "Elaine", "Female", "Rastall" },
                    { 3, "Myrtice", "Female", "Weinham" },
                    { 2, "Levi", "Female", "Humbatch" },
                    { 31, "Raynard", "Male", "Leport" },
                    { 32, "Xerxes", "Male", "Sully" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Matches_Person1Id",
                table: "Matches",
                column: "Person1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_Person2Id",
                table: "Matches",
                column: "Person2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_WinnerId",
                table: "Matches",
                column: "WinnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Matches");

            migrationBuilder.DropTable(
                name: "Persons");
        }
    }
}
