namespace Application.Helpers;

public static class TemplateHtmlHelper
{
    public static string GetListTemplate(List<string> list)
    {
        var template = "<ul>";
        foreach (var item in list)
        {
            template += $"<li>{item}</li>";
        }

        template += "</ul>";
        return template;
    }
}
