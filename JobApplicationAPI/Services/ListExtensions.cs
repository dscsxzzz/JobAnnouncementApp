namespace JobApplicationAPI.Services.ListExtension;

public static class ListExtensions
{
    public static IEnumerable<T> IntersectWithFallback<T>(this IEnumerable<T> first, IEnumerable<T> second)
    {
        if (first == null || !first.Any())
        {
            return second;
        }
        else if (second == null || !second.Any())
        {
            return first;
        }
        else
        {
            return first.Intersect(second);
        }
    }
}